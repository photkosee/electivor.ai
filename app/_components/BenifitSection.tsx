import benefits, { BenefitType } from "@/app/_data/benefits";

const BenefitSection = () => {
  return (
    <div className="flex flex-col gap-y-10 px-2">
      <h2 className="text-3xl xs:text-4xl font-bold text-center text-gray-100">
        Why Ask{" "}
        <span
          className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text
          text-transparent font-bold"
        >
          Electivor
        </span>
        ?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {benefits.map((benefit: BenefitType, index: number) => (
          <div key={index} className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              <div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400
                to-teal-500 flex items-center justify-center"
              >
                <benefit.icon className="size-8 text-white" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-1 text-gray-100">
                {benefit.title}
              </h3>
              <p className="text-gray-300 text-sm">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitSection;
