import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const MOCK_MODE_URL_PARAM_KEY = "mock";

// simple enough to keep the state of mock mode in URL only
export function useMockMode() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mockMode = searchParams.get(MOCK_MODE_URL_PARAM_KEY) === 'true';


  const onMockModeToggle = useCallback(() => {
    searchParams.set(MOCK_MODE_URL_PARAM_KEY, String(!mockMode));
    setSearchParams(searchParams);
  }, [mockMode, searchParams, setSearchParams]);
  
  return {mockMode, onMockModeToggle};
}
