
# BenNadel.com Healthcheck

This is an experiment to see if I can use a **Netlify cron function** as a make-shift healthcheck for my blog, **[bennadel.com](https://www.bennadel.com/)**. The idea being that it will call the healthcheck every few minutes. And, if it returns a non-200 status code, it will send me an email via Postmark.
