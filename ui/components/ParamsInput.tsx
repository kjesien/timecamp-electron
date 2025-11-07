import { DateSelector } from "./DateSelector.tsx";
import { UserInput } from "./UserInput.tsx";
import { FC, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage.tsx";
import { useLocalStorage } from "react-use";

const invalidUserId = "Provide valid User Id";
const invalidToken = "Provide valid Token";
const maxDates = 20;

const schema = z.object({
  dates: z
    .array(z.string())
    .min(1, "Select at least one date")
    .max(maxDates, "You can add up to 20 dates at a time"),
  userId: z.string(invalidUserId).min(1, invalidUserId),
  userToken: z.string(invalidToken).min(1, invalidToken),
});

export type SchemaActivityParams = z.infer<typeof schema>;

export interface ParamsInputProps {
  isLoading: boolean;
  onParamsChange: (params: SchemaActivityParams) => void;
}

export const ParamsInput: FC<ParamsInputProps> = ({
  onParamsChange,
  isLoading,
}) => {
  const [prevFormValues, persistFormValues] =
    useLocalStorage<SchemaActivityParams>("activity/form", {
      dates: [],
      userToken: "",
      userId: "",
    });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: prevFormValues,
  });

  const values = form.watch();

  useEffect(() => {
    persistFormValues(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.userId, values.userToken, values.dates.length]);

  useEffect(() => {
    const initialLoadIfValid = () =>
      form.trigger().then((isValid) => isValid && onParamsChange(values));

    initialLoadIfValid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const firstError = Object.entries(form.formState.errors).map(
    ([key, error]) => ({ key, error }),
  )[0];

  return (
    <div>
      <div className="mb-6 gap-3 flex flex-col">
        <UserInput
          initialUserId={values.userId}
          initialUserToken={values.userToken}
          onChange={async (userId, userToken) => {
            form.setValue("userId", userId);
            form.setValue("userToken", userToken);
            await form.trigger();
          }}
        />
        <DateSelector
          selectedDates={values.dates}
          max={maxDates}
          onDatesChange={async (dates) => {
            form.setValue("dates", dates);
            await form.trigger();
          }}
        />

        {firstError?.error.message && (
          <ErrorMessage
            message={`${firstError.key}: ${firstError.error.message}`}
          />
        )}
        <button
          onClick={() => {
            onParamsChange(values);
          }}
          disabled={!form.formState.isValid || isLoading}
          className=" py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
};
