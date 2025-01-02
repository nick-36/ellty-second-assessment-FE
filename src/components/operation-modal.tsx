"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { NumberInput } from "@/components/number-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { ImSpinner } from "react-icons/im";
import Cookies from "js-cookie";

const OperationSchema = z.object({
  type: z.enum(["ADD", "SUBTRACT", "MULTIPLY", "DIVIDE"]),
  rightNumber: z
    .number()
    .min(-1000000, "Number must be greater than -1000000")
    .max(1000000, "Number must be less than 1000000"),
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
  parentOperation: {
    id: number | null;
    result: number;
  };
  fetchTreeById?: (id: string) => Promise<any>;
}

const OperationValidation = z.object({
  type: z.enum(["ADD", "SUBTRACT", "MULTIPLY", "DIVIDE"]),
  rightNumber: z
    .number()
    .min(-1000000, "Number must be greater than -1000000")
    .max(1000000, "Number must be less than 1000000"),
});

export default function OperationModal({
  isOpen,
  onClose,
  parentOperation,
  fetchTreeById,
}: Props) {
  const [preview, setPreview] = useState<number | null>(null);
  const router = useRouter();
  const params = useParams();
  const [loading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof OperationSchema>>({
    resolver: zodResolver(OperationSchema),
    defaultValues: {
      type: "ADD",
      rightNumber: 0,
    },
  });

  const calculatePreview = (type: string, rightNumber: number) => {
    switch (type) {
      case "ADD":
        return parentOperation.result + rightNumber;
      case "SUBTRACT":
        return parentOperation.result - rightNumber;
      case "MULTIPLY":
        return parentOperation.result * rightNumber;
      case "DIVIDE":
        return rightNumber !== 0 ? parentOperation.result / rightNumber : null;
      default:
        return null;
    }
  };

  const onSubmit = async (values: z.infer<typeof OperationValidation>) => {
    try {
      const token = Cookies.get("token");

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_DEV}/trees/${params.id}/operations`,
        {
          ...values,
          parentOperationId: parentOperation?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(fetchTreeById, "IDD");
      fetchTreeById?.(params.id as string);
      router?.refresh();
      onClose?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add operation",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-2 text-light-1 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-light-1">
            Add Operation
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-center gap-2 text-gray-400 mb-6">
            <span>Current Value:</span>
            <span className="text-light-1 font-semibold">
              {parentOperation.result}
            </span>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-light-2">
                      Operation Type
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(val) => {
                          field.onChange(val);
                          setPreview(
                            calculatePreview(
                              form.getValues("type"),
                              form.getValues("rightNumber")
                            )
                          );
                        }}
                        defaultValue={field.value}
                        className="grid grid-cols-4 gap-4"
                      >
                        {[
                          { value: "ADD", label: "+" },
                          { value: "SUBTRACT", label: "-" },
                          { value: "MULTIPLY", label: "×" },
                          { value: "DIVIDE", label: "÷" },
                        ].map((operation) => (
                          <div
                            key={operation.value}
                            className={`flex items-center justify-center p-3 rounded-lg border transition-colors cursor-pointer
        ${
          field.value === operation.value
            ? "border-primary-500 bg-primary-500/20 text-primary-500"
            : "border-gray-700 hover:bg-primary-500/10 text-light-1"
        }`}
                          >
                            <RadioGroupItem
                              value={operation.value}
                              id={operation.value.toLowerCase()}
                              className="sr-only"
                            />
                            <label
                              htmlFor={operation.value.toLowerCase()}
                              className="text-2xl cursor-pointer w-full h-full flex items-center justify-center"
                            >
                              {operation.label}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rightNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-light-2">Number</FormLabel>
                    <FormControl>
                      <NumberInput
                        {...field}
                        placeholder="Enter a number"
                        className="bg-dark-3 border-gray-700 text-light-1"
                        onChange={(value) => {
                          field.onChange(value);
                          setPreview(
                            calculatePreview(form.getValues("type"), value)
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {preview !== null && (
                <div className="p-4 rounded-lg bg-dark-3 border border-gray-700">
                  <p className="text-gray-400">Preview:</p>
                  <p className="text-light-1 font-semibold mt-1">{preview}</p>
                </div>
              )}

              <Button
                disabled={loading}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  startTransition(() => onSubmit(form.getValues()));
                }}
                className="w-full bg-primary-500 hover:bg-primary-600"
              >
                Perform Operation{" "}
                {loading && <ImSpinner className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
