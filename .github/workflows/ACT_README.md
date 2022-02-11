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

### Enviroments

The ENVVARS are going to be stored in .act.env, same principle as SECRETS but only for the container run, not very realiable.

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


### Error

##### S3-sync
If you get this error:
```
[02-Integration/Distribution]   🐳  docker run image=act-jakejarvis-s3-sync-action-master-dockeraction:latest platform= entrypoint=[] cmd=["--acl" "public-read" "--follow-symlinks" "--delete"]
| fatal error: An error occurred (AccessDenied) when calling the ListObjectsV2 operation: Access Denied
[02-Integration/Distribution]   ❌  Failure - jakejarvis/s3-sync-action@master
```

Ignore it, it seems locally the buckets needs more permissions rather than from GITHUB, it will work ( FIXME )

##### Artifact upload/download

If you get this error:
```
[02-Integration/Distribution]   💬  ::debug::/Users/nicolastobias/Repos/01_trabajo/Ritmo/***s/static/media/gilroy-light-webfont.5b1ae7ef.woff2 size:(20040) blksize:(4096) blocks:(40)
| Skipping download validation.
| Total file count: 255 ---- Processed file #254 (99.6%)
| Total file count: 255 ---- Processed file #254 (99.6%)
| Total file count: 255 ---- Processed file #254 (99.6%)
| Total file count: 255 ---- Processed file #254 (99.6%)
| Total file count: 255 ---- Processed file #254 (99.6%)
| Total file count: 255 ---- Processed file #254 (99.6%)
| Total file count: 255 ---- Processed file #254 (99.6%)
| Total file count: 255 ---- Processed file #254 (99.6%)
| Total file count: 255 ---- Processed file #254 (99.6%)
| Finished backoff for retry #2, continuing with download
[02-Integration/Distribution]   ❗  ::error::An error occurred while attempting to decompress the response stream
```

Simply
1. delete all docker running images `docker ps` and `docker rm [id]`
2. delete your local machine `/tmp/[number]` folder
3. try again

This seems is a random problem with docker images and volumes.

###### Cloudfront

By running on ACT, it wont execute the cloudfron invalidations because it seems some problems
regarding the AWS_KEY and account (if you try lo get al distributions from the container running the step, it will tell you
there is no one, but there is).

Trust it, from the github actions they will work (if you dont believe me, check this repo workflows and you will see it)
