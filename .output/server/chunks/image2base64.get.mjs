const image2base64_get = async (req, res) => {
  const img = await fetch("https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/328548744_924444412255078_1882474697048880940_n.webp?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=H23QxJEPYd4AX-mjq4H&edm=APU89FABAAAA&ccb=7-5&oh=00_AfAb3MeK41tvO_ILf71OSjrA3icZ92lvfaWRQr7bfQmHnw&oe=63DF86F2&_nc_sid=86f79a").then((result) => result.arrayBuffer()).then((arrayBuffer2) => Buffer.from(arrayBuffer2)).then((buffer2) => buffer2.toString("base64"));
  return img;
};

export { image2base64_get as default };
