## Deployments procedure

### To Sandbox

All merges to _main_ branch will be automatically deployed in [sandbox environment](https://my.sbx.getritmo.com): my.sbx.getritmo.com

### To Staging....


### To Production

In the [deploys](https://github.com/getritmo/frontend-portal-react/issues/2) thread, post a comment with the following content: 

`/deploy`

## Testing in mobile

If you want to check in mobile how the app looks like while being served from your local host, you need to execute the script "dev:mobile" which  push up the dev server using HTTPS protocol. After that, you will be able to access the app using the url https://your-local-ip:3000


## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

to run it locally you should just run:

npm run start:development

### Configure credentials

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.

files to be updated with the correct information:

.env.development
.env.stagging
.env.production

### Compiles and minifies for production

```bash
npm run build
```

### Deployed by
DevOps


## Montar dockers para trabajar con SBX desde localhost

- From root folder it is executed: 
  ```make run-with-proxy```

Remember to include `127.0.0.1 my.sbx.getritmo.com` in your /etc/hosts file!

Also remember to coment this line if you are not working with this option...



