import { PrimeReactProvider, type APIOptions } from "primereact/api";
import { FilterMatchMode } from "primereact/api";
import type { ReactNode } from "react";

const primeValue: APIOptions = {
  inputStyle: "filled",
  unstyled: false,
  hideOverlaysOnDocumentScrolling: true,
  ripple: true,
  cssTransition: true,
  appendTo: "self",
  filterMatchModeOptions: {
    text: [
      FilterMatchMode.STARTS_WITH,
      FilterMatchMode.CONTAINS,
      FilterMatchMode.ENDS_WITH,
    ],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.LESS_THAN],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_BEFORE],
  },
};

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return <PrimeReactProvider value={primeValue}>{children}</PrimeReactProvider>;
};

export default GlobalProvider;
