## Guide

URL:  http://localhost:3000/.well-known/openid-configuration

PATH:  /Users/birdsong/drafts/auth-server/example/support/configuration.js
```

   {
      client_id: 'birdsong',
      client_secret: '12345abcde',
      redirect_uris: ['https://oidcdebugger.com/debug', 'http://localhost:4000/callback']
    }

```

## Runtime

```
nvm use lts/hydrogen
nvm use lts/jod
```


## Dev Server Startup

```
ngrok start --all
```

## Client Server Named ts-server

https://e004ffb048bc.ngrok.app/api/v1/auth/login



## Clinet Server Doc
https://www.passportjs.org/packages/passport-openidconnect/


## Git

git clone git@github-sueydev:sueydev/ts-server.git
git clone git@github-sueydev:sueydev/auth-server.git
git clone git@github-sueydev:sueydev/face-login.git

