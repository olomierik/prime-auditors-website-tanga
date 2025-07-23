
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const OfficeGallery = () => {
  const officeImages = [
    {
      src: "/lovable-uploads/3beb4e00-de9d-4b67-b16d-009a64dc69db.png",
      alt: "Prime Auditors Office Interior - Modern workspace with professional filing systems",
      title: "Modern Office Space"
    },
    {
      src: "/lovable-uploads/52c82007-af60-403f-ab48-5701acfa918d.png",
      alt: "Prime Auditors Team Member at Work - Professional working environment",
      title: "Professional Team"
    },
    {
      src: "/lovable-uploads/7fcc0dc2-c393-4b31-8e06-b1c44d4175c1.png",
      alt: "Prime Auditors Office Meeting Area - Collaborative workspace",
      title: "Collaborative Environment"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {officeImages.map((image, index) => (
        <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-0">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-montserrat font-semibold text-prime-blue text-lg">
                {image.title}
              </h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OfficeGallery;
