import React from 'react';
const AboutUsPage = () => {
  return <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative bg-black text-white py-24">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Our Story
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Crafting quality socks with passion since 2015
          </p>
        </div>
      </div>
      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              At Kasi Socks, we believe that true style begins from the ground
              up. Our mission is to transform an often overlooked accessory into
              a statement piece that reflects your personality and elevates your
              entire outfit.
            </p>
            <div className="h-1 w-24 bg-yellow-500 mx-auto"></div>
          </div>
        </div>
      </section>
      {/* Founder Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-serif text-3xl font-bold mb-4">
                From Passion to Brand
              </h2>
              <p className="text-gray-700 mb-4">
                Our founder, Sarah Kasi, started the company after noticing a
                gap in the market for high-quality, stylish socks that could
                serve as both a comfortable essential and a fashion statement.
              </p>
              <p className="text-gray-700 mb-4">
                What began as a small operation in Sarah's apartment has grown
                into a beloved brand known for its commitment to quality,
                innovative designs, and sustainable practices. Each pair of Kasi
                Socks is crafted with the same attention to detail and passion
                that inspired our very first collection.
              </p>
              <p className="text-gray-700">
                "I wanted to create socks that people would be excited to wear
                and proud to show off," says Sarah. "Something that combines
                comfort, durability, and style in equal measure."
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img src="https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Kasi Socks founder" className="rounded-md shadow-lg w-full h-auto" />
            </div>
          </div>
        </div>
      </section>
      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border-t-2 border-yellow-500">
              <h3 className="font-serif text-xl font-bold mb-4">Quality</h3>
              <p className="text-gray-700">
                We use only the finest materials and work with skilled
                craftspeople to ensure every pair of socks meets our exacting
                standards. From the initial design to the final stitch, quality
                is our top priority.
              </p>
            </div>
            <div className="text-center p-6 border-t-2 border-yellow-500">
              <h3 className="font-serif text-xl font-bold mb-4">
                Sustainability
              </h3>
              <p className="text-gray-700">
                We're committed to minimizing our environmental impact through
                responsible sourcing, eco-friendly materials, and waste
                reduction. Our packaging is recyclable, and we're constantly
                seeking ways to make our production more sustainable.
              </p>
            </div>
            <div className="text-center p-6 border-t-2 border-yellow-500">
              <h3 className="font-serif text-xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-700">
                We're always exploring new designs, materials, and manufacturing
                techniques to bring you the most comfortable, durable, and
                stylish socks possible. Innovation drives everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Manufacturing Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">
              Our Manufacturing Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Sock manufacturing" className="rounded-md w-full h-auto mb-4" />
              </div>
              <div>
                <div className="mb-6">
                  <h3 className="font-serif text-xl font-bold mb-2">
                    1. Material Selection
                  </h3>
                  <p className="text-gray-700">
                    We carefully select premium materials like organic cotton,
                    merino wool, and recycled fibers that meet our standards for
                    comfort, durability, and sustainability.
                  </p>
                </div>
                <div className="mb-6">
                  <h3 className="font-serif text-xl font-bold mb-2">
                    2. Design & Prototyping
                  </h3>
                  <p className="text-gray-700">
                    Our in-house design team creates unique patterns and tests
                    multiple prototypes to ensure the perfect fit, feel, and
                    appearance.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2">
                    3. Ethical Production
                  </h3>
                  <p className="text-gray-700">
                    We partner with ethical manufacturers who provide fair wages
                    and safe working conditions. Every pair of Kasi Socks is
                    made with care by skilled artisans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Join the Team */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold mb-6">
            Join the Kasi Socks Family
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            We're always looking for passionate individuals to join our growing
            team. Check out our open positions or reach out to learn more about
            career opportunities at Kasi Socks.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-8 font-medium transition-colors">
            View Careers
          </button>
        </div>
      </section>
    </div>;
};
export default AboutUsPage;