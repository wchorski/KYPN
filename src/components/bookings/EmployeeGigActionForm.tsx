"use client";

import { StatusBadge } from "@components/StatusBadge";
import { Button } from "@components/elements/Button";
import { useRef, useState } from "react";
import {
  useFormState,
  useFormStatus,
} from "react-dom";

type UpdateBookingResponse = {
  updateBooking?: {
    id: string;
  };
  error?: any;
};

type EmployeeGigAction = "" | "CONFIRMED" | "DECLINED";

type Props = {
  userId: string;
  bookingId: string;
  action: EmployeeGigAction;
};

type Fields = {
  action: EmployeeGigAction;
};

const actionOptions = [
  { value: "CONFIRMED", label: "Confirm" },
  { value: "DECLINED", label: "Decline" },
];

type FormState = {
  message: EmployeeGigAction;
  errors: Record<keyof Fields, string> | undefined;
  fieldValues: Fields;
};

export function EmployeeGigActionForm({ userId, bookingId, action }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [empActionState, setEmpActionState] = useState<EmployeeGigAction>("");

  const defaultFormData:FormState = {
    message: "",
    errors: undefined,
    fieldValues: {
      action,
    },
  };
  const [formState, formAction] = useFormState(onSubmit, defaultFormData);

  async function onSubmit(
    prevState: FormState,
    data: FormData
  ): Promise<FormState> {
    const action = data.get("action") as EmployeeGigAction;
    const inputValues = {
      action,
    } as Fields;

    try {
      if (typeof action !== "string")
        throw new Error("!!! action is not string");

      const res = await fetch(`/api/gql/protected`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation UpdateBooking($where: BookingWhereUniqueInput!, $data: BookingUpdateInput!) {
              updateBooking(where: $where, data: $data) {
                id
              }
            }
          `,
          variables: {
            where: { id: bookingId },
            data:
              action === "CONFIRMED"
                ? {
                    status: "CONFIRMED",
                    employee_requests: {
                      disconnect: [
                        {
                          id: userId,
                        },
                      ],
                    },
                    employees: {
                      connect: [
                        {
                          id: userId,
                        },
                      ],
                    },
                  }
                : // todo may add ability to decline gig
                  {
                    employee_requests: {
                      connect: [
                        {
                          id: userId,
                        },
                      ],
                    },
                    employees: {
                      disconnect: [
                        {
                          id: userId,
                        },
                      ],
                    },
                  },
          },
        }),
      });

      const { updateBooking, error } =
        (await res.json()) as UpdateBookingResponse;
      console.log({ updateBooking });
      if (error) throw new Error(error.message);

      setEmpActionState(action);

      return {
        ...formState,
        message: action,
      };

      // setQuantityState(updateCartItem.quantity)
    } catch (error: any) {
      console.warn("!!! EmpGigAction Error: ", error);
      return {
        message: error?.message,
        // TODO validate each field
        errors: {
          action: "",
        },
        fieldValues: inputValues,
      };
    } finally {
    }
  }

  if(empActionState) return <StatusBadge type={'booking'} status={formState.message}/>

  return (
    <form action={formAction} ref={formRef}>
      {empActionState}
      <fieldset>
        <ul className="radio">
          {actionOptions.map((opt, i) => (
            <label htmlFor="action" key={i}>
              <input
                type="radio"
                name="action"
                id={opt.value + "-" + i}
                value={opt.value}
                defaultChecked={opt.value === empActionState}
              />
              {opt.value === empActionState ? (
                <strong className="current">{opt.label}</strong>
              ) : (
                <span> {opt.label} </span>
              )}
            </label>
          ))}
        </ul>
      </fieldset>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    // <button
    //   disabled={pending}
    //   type={'submit'}
    //   className="button large"
    // >
    //   {pending ? <LoadingAnim /> : 'Update'}
    // </button>
    <Button size={"small"} type={"submit"} disabled={pending}>
      {" "}
      Submit{" "}
    </Button>
  );
}

{
  /* <div className="flex g-1">
      {!EmpActionState ? <>
        <Button size={"small"} onClick={updateBooking}> Accept </Button>
        <Button size={"small"}> Decline </Button>
      </> : <>
        <p>{EmpActionState}</p>
      </> }
    </div> */
}
