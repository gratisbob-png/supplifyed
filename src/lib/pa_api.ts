/**
 * Amazon Product Advertising API v5 client.
 * Uses AWS Signature V4 — no extra dependencies, Node.js crypto only.
 */

import { createHmac, createHash } from 'crypto';

export interface PAAPIConfig {
  accessKey: string;
  secretKey: string;
  partnerTag: string;
  host: string;
  region: string;
}

export interface PAAPIProduct {
  asin: string;
  title: string;
  detailPageUrl: string;
  price?: number;
  currency?: string;
  features: string[];
  imageUrl?: string;
  availability?: string;
}

export interface PAAPIError {
  code: string;
  message: string;
}

// ─── Sig V4 helpers ────────────────────────────────────────────────────────────

function sha256hex(data: string): string {
  return createHash('sha256').update(data, 'utf8').digest('hex');
}

function hmac(key: Buffer | string, data: string): Buffer {
  return createHmac('sha256', key).update(data, 'utf8').digest();
}

function signingKey(secretKey: string, dateStamp: string, region: string, service: string): Buffer {
  const kDate = hmac('AWS4' + secretKey, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, 'aws4_request');
}

function amzTimestamp(date: Date): { amzDate: string; dateStamp: string } {
  const iso = date.toISOString().replace(/[:\-]/g, '').replace(/\.\d{3}/, '');
  return {
    amzDate: iso,
    dateStamp: iso.slice(0, 8),
  };
}

// ─── PA API v5 request ─────────────────────────────────────────────────────────

const SERVICE = 'ProductAdvertisingAPI';
const PATH = '/paapi5/getitems';
const TARGET = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems';
const RESOURCES = [
  'ItemInfo.Title',
  'ItemInfo.Features',
  'Offers.Listings.Price',
  'Offers.Listings.Availability.Message',
  'Images.Primary.Large',
];

export async function getItems(
  asins: string[],
  config: PAAPIConfig
): Promise<{ items: PAAPIProduct[]; errors: PAAPIError[] }> {
  const { amzDate, dateStamp } = amzTimestamp(new Date());

  const marketplace = `www.${config.host.replace('webservices.', '')}`;

  const payload = JSON.stringify({
    ItemIds: asins,
    Resources: RESOURCES,
    PartnerTag: config.partnerTag,
    PartnerType: 'Associates',
    Marketplace: marketplace,
  });

  const payloadHash = sha256hex(payload);

  // Canonical headers must be sorted alphabetically by header name
  const canonicalHeaders = [
    'content-encoding:amz-1.0',
    'content-type:application/json; charset=UTF-8',
    `host:${config.host}`,
    `x-amz-date:${amzDate}`,
    `x-amz-target:${TARGET}`,
  ].join('\n') + '\n';

  const signedHeaders = 'content-encoding;content-type;host;x-amz-date;x-amz-target';

  const canonicalRequest = [
    'POST',
    PATH,
    '', // no query string
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const credentialScope = `${dateStamp}/${config.region}/${SERVICE}/aws4_request`;

  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256hex(canonicalRequest),
  ].join('\n');

  const kSigning = signingKey(config.secretKey, dateStamp, config.region, SERVICE);
  const signature = createHmac('sha256', kSigning).update(stringToSign, 'utf8').digest('hex');

  const authorization =
    `AWS4-HMAC-SHA256 Credential=${config.accessKey}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(`https://${config.host}${PATH}`, {
    method: 'POST',
    headers: {
      'content-encoding': 'amz-1.0',
      'content-type': 'application/json; charset=UTF-8',
      host: config.host,
      'x-amz-date': amzDate,
      'x-amz-target': TARGET,
      Authorization: authorization,
    },
    body: payload,
    signal: AbortSignal.timeout(15_000),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = body?.Errors?.[0]?.Message ?? body?.message ?? `HTTP ${res.status}`;
    const code = body?.Errors?.[0]?.Code ?? 'UnknownError';
    return { items: [], errors: [{ code, message: msg }] };
  }

  const rawItems: unknown[] = (body as { ItemsResult?: { Items?: unknown[] } }).ItemsResult?.Items ?? [];
  const rawErrors: { Code: string; Message: string }[] = (body as { Errors?: { Code: string; Message: string }[] }).Errors ?? [];

  const items: PAAPIProduct[] = rawItems.map((item) => {
    const i = item as Record<string, unknown>;
    const offers = (i.Offers as { Listings?: { Price?: { Amount?: number; Currency?: string }; Availability?: { Message?: string } }[] } | undefined)?.Listings?.[0];
    const image = (i.Images as { Primary?: { Large?: { URL?: string } } } | undefined)?.Primary?.Large?.URL;
    const title = (i.ItemInfo as { Title?: { DisplayValue?: string } } | undefined)?.Title?.DisplayValue ?? '';
    const features: string[] = (i.ItemInfo as { Features?: { DisplayValues?: string[] } } | undefined)?.Features?.DisplayValues ?? [];

    return {
      asin: (i.ASIN as string) ?? '',
      title,
      detailPageUrl: (i.DetailPageURL as string) ?? '',
      price: offers?.Price?.Amount,
      currency: offers?.Price?.Currency,
      features,
      imageUrl: image,
      availability: offers?.Availability?.Message,
    };
  });

  const errors: PAAPIError[] = rawErrors.map((e) => ({ code: e.Code, message: e.Message }));

  return { items, errors };
}

// ─── Config loader ─────────────────────────────────────────────────────────────

export function loadConfig(): PAAPIConfig | null {
  const accessKey = process.env.AMAZON_ACCESS_KEY;
  const secretKey = process.env.AMAZON_SECRET_KEY;

  if (!accessKey || !secretKey) return null;

  return {
    accessKey,
    secretKey,
    partnerTag: process.env.AMAZON_PARTNER_TAG ?? 'supplifyed-21',
    host: process.env.AMAZON_HOST ?? 'webservices.amazon.co.uk',
    region: process.env.AMAZON_REGION ?? 'eu-west-1',
  };
}
