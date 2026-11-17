export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

/** Verified delivery and build photos from public/deliveries. */
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/deliveries/belle-chasse/belle-chasse-industrial-container-tilt-bed-delivery.jpg",
    alt: "Tilt-bed truck delivering a finished container office to Belle Chasse, LA",
    caption: "Tilt-bed delivery — Belle Chasse industrial yard",
  },
  {
    src: "/deliveries/belle-chasse/belle-chasse-40ft-container-office-yard-delivery.jpg",
    alt: "40-foot container office set on a commercial jobsite in Belle Chasse, LA",
    caption: "40′ office on site — Belle Chasse",
  },
  {
    src: "/deliveries/cameron-cp2/delivery-1.jpg",
    alt: "Climate-controlled container storage unit staged for delivery",
    caption: "Climate storage build — Cameron Parish",
  },
  {
    src: "/deliveries/cameron-cp2/delivery-2.jpg",
    alt: "Container unit loaded on tilt-bed trailer",
    caption: "Loaded for transport",
  },
  {
    src: "/deliveries/cameron-cp2/delivery-3.jpg",
    alt: "Container set on prepared pad at customer site",
    caption: "Ground-level placement",
  },
  {
    src: "/deliveries/cameron-cp2/delivery-4.jpg",
    alt: "Exterior of finished climate-controlled container",
    caption: "Climate-controlled exterior",
  },
  {
    src: "/deliveries/cameron-cp2/delivery-5.jpg",
    alt: "Delivery crew positioning container on site",
    caption: "On-site positioning",
  },
  {
    src: "/deliveries/plaquemines-lng/plaquemines-lng-container-office-loading.jpg",
    alt: "Container office being loaded for LNG project site delivery",
    caption: "LNG project mobilization — Plaquemines Parish",
  },
  {
    src: "/deliveries/plaquemines-lng/custom-remote-office-port-sulphur-la.jpg",
    alt: "Custom remote container office near Port Sulphur, Louisiana",
    caption: "Remote office — Port Sulphur area",
  },
  {
    src: "/City-Pages-Pics/Houma-Delivery-1.jpg",
    alt: "Custom shipping container office delivered in Houma, LA",
    caption: "Houma maritime staging delivery",
  },
  {
    src: "/City-Pages-Pics/Houma-Delivery-2.jpg",
    alt: "Container office exterior on Houma jobsite",
    caption: "Houma jobsite placement",
  },
  {
    src: "/City-Pages-Pics/Houma-Delivery-3.jpg",
    alt: "Finished container office details on Houma delivery",
    caption: "Houma delivery detail",
  },
];