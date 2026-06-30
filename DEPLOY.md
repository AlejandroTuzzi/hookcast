# HookCast deployment

HookCast runs as a Docker container behind Nginx.

- Application directory: `/opt/hookcast`
- Persistent admin data: `/var/lib/hookcast`
- Persistent media library: `/srv/hookcast/media`
- Internal address: `127.0.0.1:3011`
- Public domains: `hookcast.studio` and `www.hookcast.studio`

## Update

```bash
cd /opt/hookcast
./update.sh
```

Runtime secrets stay in `/opt/hookcast/.env` and are never committed.

Files uploaded to `/srv/hookcast/media` are served directly by Nginx at
`https://hookcast.studio/media/<filename>` and are not modified by deployments.
