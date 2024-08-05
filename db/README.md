## Deploy Seperate DB

```bash
cp compose.example.yml compose.yml
```

Here is an example when deploying the database outside of the other compose stack. Useful for when you want to share this db with multiple frontends or work with the *production* database with your *dev* environment.

## Make Sure
Make sure to uncomment out your `db` service in your main `compose.yml` file if you intend to do this