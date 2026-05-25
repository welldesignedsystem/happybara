# Happybara Café

## Configuration Files

### `.env.local`

Stores EmailJS credentials for the order form.

**Format:**
```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: SAMPLE_aZ1Rv7UQvBIC4nV2k
NEXT_PUBLIC_EMAILJS_SERVICE_ID: SAMPLE_service_bp5ocbi
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: SAMPLE_template_ejjpe3b
```

**Steps to create:**

1. Sign up at https://www.emailjs.com
2. Create an Email Service and note the Service ID
3. Create an Email Template and note the Template ID
4. Go to Account → API Keys and copy your Public Key
5. Create `.env.local` in the project root and fill in the values above

### `app.yaml`

Wasmer Edge deployment configuration with environment variables (gitignored — create per-deployment).

**Format:**
```yaml
kind: wasmer.io/App.v0
name: your-app-name
owner: your-wasmer-username
package: .
env:
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: SAMPLE_aZ1Rv7UQvBIC4nV2k
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: SAMPLE_service_bp5ocbi
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: SAMPLE_template_ejjpe3b
```

**Steps to create:**

1. Install Wasmer CLI: `curl https://get.wasmer.io | sh`
2. Log in: `wasmer login`
3. Copy `.env.local` values into the `env:` section
4. Run `wasmer deploy` from the project root

> `app.yaml` is gitignored because it contains secrets. Copy the template above and fill in your Wasmer username and EmailJS values. The existing `app.yaml` in the repo is a sample for reference only.
