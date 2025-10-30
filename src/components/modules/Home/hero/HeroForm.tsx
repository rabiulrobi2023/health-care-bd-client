import { StarsIcon } from "lucide-react";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";

const HeroForm = () => {
  return (
    <div className="flex mx-auto items-end mr-0">
      <div className=" rounded-xl p-6  md:p-10  shadow-lg border border-gray-100 w-fit">
        {/* Card Header */}
        <div className="space-y-2 mb-6">
          <h2 className="text-gray-700 text-2xl font-bold">
            Find the Right Doctor
          </h2>
          <p className="text-gray-600">
            Describe your symptoms and well suggest specialists for you
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="E.g. heart, chest pain, shortness of breath "
            className="w-full border-gray-300"
          />

          <Button
            size="lg"
            className="w-full bg-[rgb(7,180,7)] hover:bg-[rgb(6,150,6)] text-white"
          >
            <StarsIcon />
            Find Doctors
          </Button>

          <p className="text-gray-500 text-sm">
            Our AI will analyze your symptoms and match you with the right
            specialists
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroForm;
