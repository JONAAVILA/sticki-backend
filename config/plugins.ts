export default ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env('SMTP_PORT',587),
        auth:{
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD')
        },
        secure: env.bool('SMTP_SECURE', false),
      }
    },
    settings: {
      defaultFrom: "stiki_soporte@stiki.com.ar",
      defaultReplyTo: "jonatanavilawebdeveloper@gmail.com"
    }
  }
});
