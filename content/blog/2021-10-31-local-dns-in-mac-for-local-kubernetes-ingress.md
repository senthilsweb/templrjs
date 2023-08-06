---
title: How to create local DNS in Mac OS for Kubernetes Ingress testing?
path: 
date: 2021-10-28
status: published
client: 
website: 
background: 
introduction: 
industries: []
rightStripColor: 'bg-gray-50'
coverimage: 
author: Senthilnathan Karuppaiah
avatar: https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg
type: Blog
tags:
  - Kubernetes
  - Blog
  - CI/CD
  - Gitops
platforms: [Web, Mobile, Tablet]
---

Often times we need a way to simulate local domain name pointing to your `api` or `web` development running in your localhost and it is critical if you use kubernetes ingress controller i.e. `nginx` `traefik` controllers to test your configuration in the local Mac laptop.

<!--more-->

This blog post will play as foundation for my upcoming kubernetes articles. Follow the below steps to setup your local Domain Name Service.

1. create a new ip e.g. `10.0.0.1`
```
sudo ifconfig lo0 10.0.0.1 alias
```

2. Forward the new ip address with port 80 `10.0.0.1:80` to your local `api` or `web` running in different ports, in this example my api is running in port `:3000`

```
echo "rdr pass on lo0 inet proto tcp from any to 10.0.0.1 port 80 -> 127.0.0.1 port 3000" | sudo pfctl -ef -
```

3. Edit your `/etc/hosts` or `/private/etc/hosts` file and add the following line to map your domain, in my case I use fake domain name as `zypress.me` to `10.0.0.1`

```
10.0.0.1 zypress.me
```

4. After you saving your hosts file, flush your local DNS to clear the DNS cache.

```
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

5. Access your `api` or `web` application using the just created fake dns `http://zypress.me`

##  How to Delete the just created ip?

```
sudo ifconfig lo0 10.0.0.1 -alias
```

## References
* [Flushing your DNS cache in Mac OS X and Linux](https://help.dreamhost.com/hc/en-us/articles/214981288-Flushing-your-DNS-cache-in-Mac-OS-X-and-Linux)
* [Stackoverflow](https://serverfault.com/questions/102416/iptables-equivalent-for-mac-os-x/673551#673551)