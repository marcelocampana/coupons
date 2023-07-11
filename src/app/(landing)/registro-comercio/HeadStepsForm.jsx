import { BARContext } from "@/app/context/BARContext";
import classNames from "../../../helpers/classnames";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

const HeadStepsForm = ({ form1, form2, form3, formStep }) => {
  const { step1Value, step2Value, step3Value } = useContext(BARContext);

  const steps = [
    {
      name: "Datos del comercio",
      href: "#",
      state,
    },
    { name: "Representante legal", href: "#", state },
    { name: "Cuenta de acceso", href: "#", state },
  ];
  // console.log("step1Value", Object.keys(step1Value).length);
  // console.log("step2Value", Object.keys(step2Value).length);
  // console.log("step3Value", Object.keys(step3Value).length);

  Object.keys(step1Value).length === 8
    ? (steps[0].state = "complete")
    : form1 && (steps[0].state = "current");

  Object.keys(step2Value).length === 3
    ? (steps[1].state = "complete")
    : form2
    ? (steps[1].state = "current")
    : form1 && (steps[1].state = "incoming");

  Object.keys(step3Value).length === 6
    ? (steps[2].state = "complete")
    : form3
    ? (steps[2].state = "current")
    : form1 || (form2 && (steps[2].state = "incoming"));

  return (
    <div className="bg-yellow-50 py-6 my-6">
      <nav aria-label="Progress" className=" ml-24 mr-12">
        <ol role="list" className="flex items-center w-full">
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20 grow" : "",
                "relative"
              )}
            >
              {step.state === "complete" ? (
                <>
                  <div
                    className={classNames(
                      "mb-1 text-sm text-pink-600",
                      stepIdx === 0 && "-ml-10",
                      stepIdx === 1 && "-ml-10",
                      stepIdx === 2 && "-ml-10"
                    )}
                  >
                    {step.name}
                  </div>

                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="mt-6 h-0.5 w-full bg-pink-600" />
                  </div>

                  <button
                    type="button"
                    className="relative flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 hover:bg-pink-900"
                    onClick={() => formStep((stepIdx + 1).toString())}
                  >
                    <CheckIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                    <span className="sr-only"></span>
                  </button>
                </>
              ) : step.state === "current" ? (
                <>
                  <div
                    className={classNames(
                      "mb-1 text-sm text-pink-600",
                      stepIdx === 0 && "-ml-10",
                      stepIdx === 1 && "-ml-10",
                      stepIdx === 2 && "-ml-10"
                    )}
                  >
                    {step.name}
                  </div>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    {stepIdx !== steps.length - 1 && (
                      <div className="mt-6 h-0.5 w-full bg-gray-200" />
                    )}
                  </div>
                  <div
                    href="#"
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-pink-600 bg-white"
                    aria-current="step"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-pink-600"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={classNames(
                      "mb-1 text-sm",
                      stepIdx === 0 && "-ml-10",
                      stepIdx === 1 && "-ml-10",
                      stepIdx === 2 && "-ml-10"
                    )}
                  >
                    {step.name}
                  </div>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    {stepIdx !== steps.length - 1 && (
                      <div className="mt-6 h-0.5 w-full bg-gray-200" />
                    )}
                  </div>
                  <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white "></div>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default HeadStepsForm;
