---
title: "Social-Card: Dynamic Image Creation on the Edge with Vercel Open Graph"
date: 2024-09-10T12:00:00.000Z
published: true
description: A dynamic image generator for business, profile, and social cards using Vercel Open Graph, Next.js, and TailwindCSS. Easily customize and create visually appealing cards for any purpose.
industries: ['Technology','Software Development','Web Design']
coverimage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Social-Card:%20Dynamic%20Image%20Creation%20on%20the%20Edge%20with%20Vercel%20Open%20Graph,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
ogImage: https://res.cloudinary.com/nathansweb/image/upload/w_800,c_fit,l_text:Arial_60_bold:Deploying%20Pentaho%20Carte%20Server%20on%20Fly.io%20with%20Firecracker%20VM,g_north_east,x_30,y_40/v1711924071/senthilsweb-scl-card-template_cyxogj.webp
author: Senthilnathan Karuppaiah
avatar: "https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg"
type: Blog
tags: ['DataObservability','DataEngineering','dbt','DuckDB','DataLineage','Analytics','DataLake','BusinessMetadataManagement','Vue.js','Nuxt.js','Open Source','Web Development','Low Code Platform']
---

![Biker Gopher](https://media.licdn.com/dms/image/v2/D4E12AQEsgX2O7Akjnw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1725940154473?e=1733961600&v=beta&t=nPUz8GLHXmYFn7oY5tCjwx6HV7UgefByj1ZeYKD6acg)

Social-card: A dynamic image generator for business, profile, and social cards using Vercel Open Graph, Next.js, and TailwindCSS. Easily customize and create visually appealing cards for any purpose! 

## Features

::list{type="success"}
- **Business, Profile, and Social Cards:** Automatically generate profile cards for sharing across platforms.
- **QR Code Generation:** A built-in API to create QR codes that can be embedded in profile cards.
- **Image URL for Profile Cards:** Generate profile cards dynamically through URL parameters for easy sharing.
- **Edge Deployment:** Optimized for edge platforms like Vercel, ensuring low latency and high availability.
::

## Technology
- **Vercel Open Graph:** Enables dynamic card generation and sharing functionality.
- **Next.js:** Powers the serverless routes for the project, including the QR code generation API.

## Using Social Cards as Image URLs

You can dynamically generate and use social cards as image URLs by specifying the required parameters in the URL.

### URL Structure

```html 
http://localhost:3000/profile-card?name=<name>&email=<email>&mobile=<mobile>&title=<title>&profile_image_url=<profile_image_url>&website=<website>
```

### Parameters

- name: The full name of the person.
- email: The person's email address.
- mobile: The person's mobile number.
- title: The person's job title.
- profile_image_url: Optional. A publicly accessible URL to the profile image.
- website: A publicly accessible URL to the website or blog.
- bg_color: Optional. Tailwind css colors[indigo, orange, pink, yellow, teal, green], the default is indigo.
- bg_image_url: Optional. A publicly accessible URL to the background image

### Demo

```html 
https://social-card-five.vercel.app/profile-card?name=Biker%20Gopher&email=biker.gopher@email.com&mobile=%2B1%20222-222-2222&title=Solutions%20Architect&profile_image_url=https://github.com/ashleymcnamara/gophers/blob/master/Biker_Gopher.png?raw=true&website=www.senthilsweb.com&bg_color=pink
```

![img1](https://media.licdn.com/dms/image/v2/D4E12AQGcwvIayR1zGA/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1725940593203?e=1733961600&v=beta&t=45V8zDLas5aXMVziA1ouxUShpKvK52ZOK0b0pAVamDQ)

![img2](https://media.licdn.com/dms/image/v2/D4E12AQGZ4pZ14a1JmA/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1725940603290?e=1733961600&v=beta&t=70Uvbh2rUSXK2bwhUFHbzSyEAWalHOZgRDWnmCQZJKQ)

![img3](https://media.licdn.com/dms/image/v2/D4E12AQFdHxNLLb-XQQ/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1725940613994?e=1733961600&v=beta&t=xv55QKzdbbkudrpbmknZjXOsbKMJ1JYlhBCG3aUiOgY)

## Source Code

Check out the fully working examples with a detailed getting started readme guide on GitHub: https://github.com/senthilsweb/social-card