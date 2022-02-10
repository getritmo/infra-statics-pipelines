# README


## PIPELINES

There is two kinds of pipelines
  *default
  *statics

### DEFAULT

These are the pipelines for the service deployment on containers, they will do:

- build of the container
- create the ECR repo if needed
- deploy to ECS cluster
- Upload of swagger doc if needed
- Tag the production relese

### STATICS

This pipelines will be used for deployment of statics to _normally_ a `cloudfront` CDN.
It differs from the `DEFAULT` because it doesnt create a container and upload to `ECS`,
but it build the statics, upload them to a bucket and then invalidate the cloudfront cache.


## ACT

ACT works as a github action tester, take a look to [the website](https://github.com/nektos/act)

### Config

Act is using a `.actrc` file located in the `statics` or `default` folder.
This will control the normal behavior of act.

Also, act use the `--reuse` which means, after every run IT WONT DESTROY THE CONTAINERS
so the information is going to be avalaible between run.
If you want a fresh start, you have to delete de containers using `docker ps` or from the docker dashboard

Also, deleting them after some rare errors, is a good wau to fix them.

### Secrets

To interpolate the secrets we were using on Github, we need to create a `.act.secrets` that wll contain the
secrets that we are using on GITHUB

### Artifact deployment

`act` uses a local artifact server, deployed by default on your machine `/tmp` folder (check act documentations)

### Cloudfront distribution

You need to setup `$CLOUDFRONT_DISTRIBUTION_[SBX|STA|PRO]` ENVVAR to the propers ones to make it work, if not, it is
going to fail on last step

### How to run it

```
act -s AWS_ACCESS_KEY_ID=[KEY] \
    -s AWS_SECRET_ACCESS_KEY=[KEY]
    -s GITHUB_TOKEN
```

> `$GITHUB_TOKEN` and `$CLOUDFRONT_DISTRIBUTION_[SBX|STA|PRO]` has to be exported to be used on this,
> you can either set a local envvar, use the secrets file
> or directly export it


