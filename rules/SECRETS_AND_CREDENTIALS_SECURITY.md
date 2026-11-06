# Secrets, Credentials & Token Security Standard

> **MANDATORY WHEN AN APPLICATION STORES USER, SERVICE, OR THIRD-PARTY CREDENTIALS.** Applies to API keys, WhatsApp/Meta tokens, SMTP credentials, payment-provider secrets, cloud/storage credentials, OAuth client secrets, webhook signing secrets and similar integration credentials.

## 1. Classify data correctly

| Data | Required handling | Reversible? |
|---|---|---|
| Human login password | Hash with Argon2id (preferred) or bcrypt using an appropriate work factor and unique salt | No |
| Password-reset / one-time verification token | Store only a cryptographic hash; short expiry, single use, invalidate after use | No |
| Third-party API key, SMTP password, WhatsApp token, OAuth client secret, webhook signing secret | Authenticated encryption at rest (AES-256-GCM or approved KMS/envelope encryption) | Yes, only in trusted backend |
| Random app-generated token used only for comparison | Store a cryptographic hash where practical | No |
| JWT access/refresh token | Sign and validate using a vetted JWT/session library; keep claims minimal; protect transport and storage | JWT is signed, not encrypted by default |

**Never bcrypt credentials that the application must later send to a provider.** Bcrypt is one-way and is for password verification, not recoverable integration credentials. Human login passwords must never be stored as reversibly encrypted text.

## 2. JWT is not a secrets vault

- JWTs may contain only minimum identity and authorization claims, such as subject/user ID, tenant ID when required, role/permission identifiers, issuer, audience, issued-at and expiry.
- **Never place passwords, API keys, SMTP passwords, WhatsApp access tokens, OAuth client secrets, database connection strings, encryption keys or other provider credentials in JWT claims or headers.**
- A normal signed JWT (JWS) is readable by whoever obtains it. Signing provides integrity/authenticity, not confidentiality. Base64 encoding or signing is not encryption.
- Use short-lived access tokens and a secure refresh/session strategy appropriate to the app. Prefer HttpOnly, Secure, SameSite cookies for browser sessions when compatible. Validate signature, allowed algorithm, issuer, audience, expiry and intended token type.

## 3. Store integration credentials in MongoDB only when MongoDB is the selected datastore

When the accepted architecture uses MongoDB, store encrypted integration credentials in a dedicated collection or appropriately isolated settings document. Do not force MongoDB into projects using another database.

Recommended record shape (illustrative; never store plaintext fields):

    {
      "tenantId": "tenant-id",
      "provider": "smtp",
      "credentialName": "primary-mailer",
      "secret": {
        "algorithm": "A256GCM",
        "keyVersion": "kms-key-version-or-key-id",
        "iv": "base64-encoded-unique-nonce",
        "ciphertext": "base64-encoded-ciphertext",
        "authTag": "base64-encoded-authentication-tag"
      },
      "status": "active",
      "createdAt": "date",
      "updatedAt": "date",
      "rotatedAt": "date"
    }

- Encrypt each secret with authenticated encryption. Use a unique nonce/IV for every encryption under a given key; never reuse an AES-GCM nonce.
- Keep encryption keys outside MongoDB and outside source control: use a cloud KMS, secrets manager, or securely provisioned environment secret. Never store the key beside ciphertext or commit it in environment files, fixtures, logs or documentation.
- Prefer envelope encryption: a KMS-managed key encrypts/unwraps a per-environment data-encryption key; include key-version metadata to support rotation.
- Bind authenticated additional data (AAD) to stable context such as tenant ID, provider and credential record ID so ciphertext cannot be moved between tenants/providers undetected.
- Use TLS for database connections and least-privilege database roles. Restrict collection access and backups/snapshots according to the same sensitivity.
- Add schema validation and reject plaintext legacy fields. Migrations must encrypt existing credentials before removing plaintext copies; provide a safe rollback plan that does not reintroduce plaintext.

If MongoDB is not the selected datastore, apply the same security properties using that datastore's secure storage pattern.

## 4. Backend-only secret access

- Frontend code may submit a credential to a trusted backend over HTTPS, but must never receive decrypted secrets back after saving.
- The backend encrypts before persistence and decrypts only immediately before a provider operation that requires the value.
- Never expose secrets in API responses, HTML, client state, browser storage, URLs, analytics, telemetry, error messages, traces or logs. Return only safe metadata such as provider, masked identifier, configured status and last-rotated timestamp.
- Use explicit server-side authorization for create, update, test, rotate and delete operations. Avoid reveal features. Enforce tenant ownership on every read/write/decrypt operation; never trust a tenant ID supplied only by the client.
- Do not decrypt secrets in edge/client runtimes or send them to AI prompts, third-party observability tools or untrusted workers.
- Provider test endpoints must return sanitized success/failure information and must not echo request headers, credentials or provider response bodies that contain secrets.

## 5. Rotation, revocation and operational controls

- Support credential replacement, rotation, revocation and deletion. Track key version and credential status without recording secret values.
- On suspected exposure, revoke/rotate the provider credential, invalidate affected sessions/tokens where relevant, and review audit logs.
- Redact Authorization headers, cookies, SMTP auth payloads, WhatsApp tokens, API keys and connection strings at every logging boundary.
- Use separate credentials and encryption keys per environment (development, staging, production). Never use production secrets in tests or examples.
- Seed data and environment templates must contain placeholders only. Secret scanning should run in CI where available.
- Backups containing ciphertext remain sensitive; protect backup access and key access independently.

## 6. Required implementation checks

Before marking credential handling complete, verify:

1. Human passwords are hashed and never recoverable; no plaintext password is persisted.
2. Integration secrets are authenticated-encrypted before database persistence; ciphertext tampering fails authentication.
3. Encryption keys are not stored in the same database, repository, logs or client bundle.
4. JWT payloads contain no credentials or secrets; tests decode a sample token and assert this.
5. API responses, logs and error paths do not leak plaintext or ciphertext unnecessarily.
6. Cross-tenant access/decryption is denied, including attempts to swap tenant IDs or credential record IDs.
7. Credential rotation/revocation and migration behavior are tested.
8. Missing KMS/key configuration fails closed; never silently fall back to plaintext.

Use the project's native stack and vetted cryptographic libraries. Do not invent custom cryptography or hard-code a cipher key. If secure key management is unavailable, do not persist integration secrets in plaintext; use an approved external secret manager or block the feature with a clear operational requirement.
