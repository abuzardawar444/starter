"use client";

import { demoAction } from "@/action/demo-form";
import { SubmitButton } from "./form/buttons";
import FormCheckBox from "./form/form-checkbox";
import FormContainer from "./form/form-container";
import FormInput from "./form/form-input";
import FormSelect from "./form/form-select";
import FormTextArea from "./form/form-textarea";

const categories: {
  value: string;
  label: "electronics" | "books" | "clothing" | "home" | "toys" | "sports";
}[] = [
  { value: "EL", label: "electronics" },
  { value: "BK", label: "books" },
  { value: "CL", label: "clothing" },
  { value: "HM", label: "home" },
  { value: "TY", label: "toys" },
  { value: "SP", label: "sports" },
];
const DemoForm = () => {
  return (
    <div className="mx-auto w-full max-w-xl p-6 space-y-6 border rounded-md shadow">
      <h2 className="text-xl font-semibold">Demo Submission Form</h2>
      <FormContainer action={demoAction}>
        <div className="grid gap-4">
          <FormInput
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
          />
          <FormTextArea
            label="Description"
            name="description"
            placeholder="Enter a description"
            required
          />
          <FormSelect
            label="Category"
            name="category"
            options={categories}
            required
            defaultValue="SP"
          />
          <FormCheckBox
            label="Subscribe to newsletter"
            name="subscribe"
            required
          />
          <div className="pt-2">
            <SubmitButton
              className="w-full"
              size="lg"
              text="Send"
              submitText="sending..."
            />
          </div>
        </div>
      </FormContainer>
    </div>
  );
};
export default DemoForm;
