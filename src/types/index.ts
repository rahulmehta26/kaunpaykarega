import type { ReactNode } from 'react';
import type { FieldApi } from "@tanstack/react-form"; // Update the module name if FieldApi comes from a different package

export type ChildrenProps = {
  children: ReactNode;
};

export type AnyFieldApi = FieldApi<
  any, any, any, any, any, any, any, any, any, any,
  any, any, any, any, any, any, any, any, any, any,
  any, any, any
>;

