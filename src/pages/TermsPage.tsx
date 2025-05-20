import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="pt-16 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rate Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Currency</h3>
                  <p className="text-gray-700">All rates are quoted in US Dollars (USD).</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Inclusions</h3>
                  <p className="text-gray-700">The rates provided include an 18% tax and cover all meals along with selected local beverages.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Rate Changes</h3>
                  <p className="text-gray-700">The management reserves the right to modify the rates, terms, and conditions at any time without prior notice.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Age Classification & Rates</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Adult Classification</h3>
                  <p className="text-gray-700">Children aged 14 years and above are considered adults and must book a separate room at the applicable adult rate.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Children's Rates (Ages 5-14)</h3>
                  <p className="text-gray-700">For children between the ages of 5 and 14, a charge of 50% of the adult sharing rate will be applied. Each child in this age group is permitted to share a bed with one adult.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Children Under 5 Years</h3>
                  <p className="text-gray-700">Children under the age of 5 can stay free of charge and may share a bed with an accompanying adult.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Applicability of Children's Rates</h3>
                  <p className="text-gray-700">The specified children's rates apply regardless of whether the child shares a room or bed with an adult or occupies a separate space.</p>
                </div>
              </div>
            </section>

            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-gray-700">
                By booking with us, you agree to these terms and conditions. Thank you for choosing our establishment, and we look forward to providing you with an exceptional experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 