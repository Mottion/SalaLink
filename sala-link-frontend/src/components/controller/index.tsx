import {
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
  type UseFormStateReturn,
  get,
  Controller as RHFController,
} from "react-hook-form";
import { ErrorMessage } from "./components/error-message";


interface Controller<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  form?: UseFormReturn<TFieldValues, any, TFieldValues>;
  name?: TName;
  label?: string;
  maxLength?: number;
  mask?: (value: string) => string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  showErrorMessage?: boolean;
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => React.ReactElement;

  // opposite component to be rendered next to the label, e.g. for a tooltip
  oppositeLabelComponent?: React.ReactNode;
}

export const Controller = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  form,
  name = "" as TName,
  label = "",
  render,
  className = "",
  showErrorMessage = true,
  oppositeLabelComponent
}: Controller<TFieldValues, TName>) => {
  return (
    <RHFController
      name={name}
      control={form?.control}
      render={(props) => (
        <div className={className}>
          <h4 
            className={'leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-90 pb-2 px-1 font-semibold text-secondary-600 data-[required]:after:text-destructive data-[required]:after:content-["*"] flex justify-between items-end'}
          >
            <label>{label}</label>
            {oppositeLabelComponent && (
              <span className="ml-2">{oppositeLabelComponent}</span>
            )}
          </h4>

          {render(props)}

          {showErrorMessage && (
            <ErrorMessage message={get(form?.formState.errors, name)?.message} />
          )}
        </div>
      )}
    />
  );
} 