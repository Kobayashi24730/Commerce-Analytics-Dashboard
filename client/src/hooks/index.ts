export { useAdd as useAddAtuali } from "./Atualizacoes/useAdd";

export * from "./auth/useLogin";
//export * from "./auth/useRegister";

export { useAdd as useAddProduto } from "./Produtos/useAdd";
export { useDel as useDelProduto } from "./Produtos/useDel";
export { useEdit as useEditiProduto } from "./Produtos/useEdit";

export { useAdd as useAddClient } from "./Clients/useAdd";
export { useDel as useDelClient} from "./Clients/useDel";
export { useEdit as useEditClient } from "./Clients/useEdit";
export { useGet as useGetClients } from "./Clients/useGet";

export { useAll as useAllVendas } from "./metrics/useAllVendas";
export { useCreci as useCrecimento } from "./metrics/useCrecimento";
export { useTaxa as useTaxa } from "./metrics/useTaxa";
export { useTop as useTopProdutos } from "./metrics/useTopProdutos";