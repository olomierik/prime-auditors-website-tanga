import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  const { locale } = useParams();
  return (
    <section className="py-20 lg:py-24 bg-prime-off-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-prime-blue mb-4 leading-tight">
          Ready to Start Your Investment in Tanzania?
        </h2>
        <p className="text-gray-600 font-open-sans mb-8 max-w-2xl mx-auto">
          Let our experts guide you through every step — from registration to operational success with precision and integrity.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={`/${locale}/#contact`}>
            <Button size="lg" className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold rounded-sm px-8 w-full sm:w-auto">
              Schedule Consultation
            </Button>
          </Link>
          <Link to={`/${locale}/#contact`}>
            <Button size="lg" variant="outline" className="border-prime-blue text-prime-blue hover:bg-prime-blue hover:text-white font-montserrat font-semibold rounded-sm px-8 w-full sm:w-auto">
              Contact Our Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;