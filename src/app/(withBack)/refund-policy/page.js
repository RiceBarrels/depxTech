import Footer from "@/components/server/footer";

export default function RefundPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Return Policy</h1>
      
      <p className="mb-6">
        We want you to be fully satisfied with your purchase. If you need to return an item, 
        please review our policy below.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Eligibility for Returns</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Returns are accepted within 7 days of the delivery date.</li>
            <li>Items must be in their original, unused condition with all packaging and accessories included.</li>
            <li>A 20% restocking fee will be applied if the returned computer affects resale conditions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Non-Returnable Items</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Computer and Computer components (such as CPUs, GPUs, etc.) cannot be returned if they are confirmed to be in working condition over 7 days</li>
            <li>Items that show signs of misuse or damage are not eligible for return.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Defective or Damaged Items</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>If you receive a defective or damaged item, please contact us within 7 days of receipt. We will provide instructions for replacement or repair.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Return Process</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To initiate a return, email our support team at [Your Email] with your order number and reason for return.</li>
            <li>You will be provided with a return authorization and instructions for shipping the item back.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Refunds</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Refunds are issued to the original payment method once the return is processed and inspected.</li>
            <li>Please allow 5–10 business days for the refund to appear in your account.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Shipping Costs</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>The customer is responsible for return shipping costs, unless the item is defective or incorrect.</li>
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
}
