import { ArrowLeft, CheckCircle, Calculator, FileText, Shield, TrendingUp, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const handleGetConsultation = () => {
    navigate('/#contact');
    // Small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white font-open-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-prime-blue via-prime-blue/95 to-prime-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-prime-gold transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-montserrat font-medium">Back to Home</span>
            </Link>
            <a 
              href="https://www.nbaa.go.tz/nbaa-firm-details/1148/show"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge variant="outline" className="border-prime-gold text-prime-gold bg-prime-gold/10 hover:bg-prime-gold/20 transition-colors cursor-pointer">
                NBAA Reg: PF517
              </Badge>
            </a>
          </div>
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-montserrat font-bold mb-6">
              Our Professional Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive financial solutions designed to drive your business success
            </p>
          </div>
        </div>
      </header>

      {/* Services Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-20">
          
          {/* 1. Accounting Services */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-prime-light-grey p-12 flex items-center justify-center">
                  <div className="w-32 h-32 bg-prime-gold/20 rounded-full flex items-center justify-center">
                    <Calculator className="w-16 h-16 text-prime-gold" />
                  </div>
                </div>
                <div className="p-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-4xl">🧾</span>
                    <h2 className="text-3xl font-montserrat font-bold text-prime-blue">Accounting Services</h2>
                  </div>
                  <h3 className="text-xl font-montserrat font-semibold text-prime-gold mb-4">
                    Accurate. Timely. Compliant.
                  </h3>
                  <p className="text-gray-700 font-open-sans mb-6 leading-relaxed">
                    We offer end-to-end accounting solutions tailored to your business needs — ensuring your financial records are always accurate, up to date, and fully compliant with regulatory standards.
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-montserrat font-semibold text-prime-blue mb-4">Our Accounting Services Include:</h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Bookkeeping & General Ledger Maintenance</div>
                          <div className="text-gray-600 text-sm">Day-to-day financial record-keeping for clarity and accountability.</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Preparation of Financial Statements</div>
                          <div className="text-gray-600 text-sm">Professionally compiled balance sheets, income statements, and cash flow statements in line with International Financial Reporting Standards (IFRS).</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Payroll Services</div>
                          <div className="text-gray-600 text-sm">Timely and confidential payroll processing with tax and benefit compliance.</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Fixed Asset Management</div>
                          <div className="text-gray-600 text-sm">Track and depreciate assets accurately to reflect their value and tax implications.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-prime-gold/10 p-4 rounded-lg border-l-4 border-prime-gold">
                    <p className="text-prime-blue font-montserrat font-medium">
                      We help you stay focused on growth while we handle the numbers.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Tax Services */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-12 order-2 lg:order-1">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-4xl">💰</span>
                    <h2 className="text-3xl font-montserrat font-bold text-prime-blue">Tax Services</h2>
                  </div>
                  <h3 className="text-xl font-montserrat font-semibold text-prime-gold mb-4">
                    Plan Smart. Pay Right. Stay Compliant.
                  </h3>
                  <p className="text-gray-700 font-open-sans mb-6 leading-relaxed">
                    Taxation can be complex — we simplify it. Whether you're a small business, large enterprise, or NGO, we ensure full compliance with Tanzanian tax laws while identifying savings opportunities.
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-montserrat font-semibold text-prime-blue mb-4">Our Tax Services Include:</h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Tax Planning & Advisory</div>
                          <div className="text-gray-600 text-sm">Strategic guidance to minimize liabilities and maximize efficiency.</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Filing of Returns</div>
                          <div className="text-gray-600 text-sm">Preparation and submission of accurate tax returns (VAT, PAYE, Withholding, Income Tax).</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Tax Health Checks</div>
                          <div className="text-gray-600 text-sm">Identify risks and ensure compliance before audits strike.</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Representation with TRA</div>
                          <div className="text-gray-600 text-sm">We liaise with the Tanzania Revenue Authority (TRA) on your behalf during assessments or disputes.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-prime-gold/10 p-4 rounded-lg border-l-4 border-prime-gold">
                    <p className="text-prime-blue font-montserrat font-medium">
                      Stay ahead of tax deadlines and reduce risk with our proactive approach.
                    </p>
                  </div>
                </div>
                <div className="bg-prime-light-grey p-12 flex items-center justify-center order-1 lg:order-2">
                  <div className="w-32 h-32 bg-prime-gold/20 rounded-full flex items-center justify-center">
                    <FileText className="w-16 h-16 text-prime-gold" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Auditing and Assurance Services */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-prime-light-grey p-12 flex items-center justify-center">
                  <div className="w-32 h-32 bg-prime-gold/20 rounded-full flex items-center justify-center">
                    <Shield className="w-16 h-16 text-prime-gold" />
                  </div>
                </div>
                <div className="p-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-4xl">✅</span>
                    <h2 className="text-3xl font-montserrat font-bold text-prime-blue">Auditing and Assurance Services</h2>
                  </div>
                  <h3 className="text-xl font-montserrat font-semibold text-prime-gold mb-4">
                    Transparent, Ethical, and Independent.
                  </h3>
                  <p className="text-gray-700 font-open-sans mb-6 leading-relaxed">
                    As a{" "}
                    <a 
                      href="https://www.nbaa.go.tz/nbaa-firm-details/1148/show"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-prime-gold hover:text-prime-gold/80 font-semibold underline cursor-pointer transition-colors"
                    >
                      certified auditing firm by NBAA
                    </a>
                    , we conduct thorough audits that go beyond compliance — delivering insights that enhance financial credibility and decision-making.
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-montserrat font-semibold text-prime-blue mb-4">Our Auditing & Assurance Services Include:</h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Statutory Audits</div>
                          <div className="text-gray-600 text-sm">Annual financial audits to meet legal and regulatory obligations.</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Internal Audits</div>
                          <div className="text-gray-600 text-sm">Ongoing assessments to evaluate your systems, controls, and risk management.</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Forensic Audits</div>
                          <div className="text-gray-600 text-sm">Detect fraud, misconduct, or discrepancies with expert reporting.</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Review & Compilation Services</div>
                          <div className="text-gray-600 text-sm">Limited assurance engagements for smaller entities or projects.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-prime-gold/10 p-4 rounded-lg border-l-4 border-prime-gold">
                    <p className="text-prime-blue font-montserrat font-medium">
                      We provide clarity, build stakeholder trust, and ensure transparency.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Management Consulting Services */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-12 order-2 lg:order-1">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-4xl">🧠</span>
                    <h2 className="text-3xl font-montserrat font-bold text-prime-blue">Management Consulting Services</h2>
                  </div>
                  <h3 className="text-xl font-montserrat font-semibold text-prime-gold mb-4">
                    Strategic Thinking for Sustainable Growth.
                  </h3>
                  <p className="text-gray-700 font-open-sans mb-6 leading-relaxed">
                    We help you make smarter decisions, improve operations, and navigate complex business challenges. Whether you're scaling, restructuring, or rethinking strategy — we're your growth partner.
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-montserrat font-semibold text-prime-blue mb-4">Our Consulting Services Cover:</h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Business Planning & Feasibility Studies</div>
                          <div className="text-gray-600 text-sm">Market analysis, financial forecasts, and investor-ready plans.</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Financial Management Advisory</div>
                          <div className="text-gray-600 text-sm">Budgeting, cash flow management, and capital structuring.</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Internal Control Systems Design</div>
                          <div className="text-gray-600 text-sm">Strong systems that protect assets and prevent fraud.</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-prime-gold mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-montserrat font-medium text-prime-blue">Organizational Development</div>
                          <div className="text-gray-600 text-sm">Advice on structure, staffing, policies, and performance metrics.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-prime-gold/10 p-4 rounded-lg border-l-4 border-prime-gold">
                    <p className="text-prime-blue font-montserrat font-medium">
                      Turn challenges into opportunities with our hands-on advisory support.
                    </p>
                  </div>
                </div>
                <div className="bg-prime-light-grey p-12 flex items-center justify-center order-1 lg:order-2">
                  <div className="w-32 h-32 bg-prime-gold/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-16 h-16 text-prime-gold" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-prime-blue to-prime-blue/90 text-white p-12 rounded-2xl shadow-xl">
            <h3 className="text-3xl font-montserrat font-bold mb-6">Ready to Get Started?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us today for a consultation and discover how our professional services can help your business thrive.
            </p>
            <Button 
              onClick={handleGetConsultation}
              size="lg" 
              className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
            >
              <Phone className="mr-3 h-5 w-5" />
              Get a Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
