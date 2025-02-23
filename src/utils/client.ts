import TranslationClient from "@toil/translate";

import config from "@/config";
import { TranslationService } from "@toil/translate/types/client";
import { LibreTransalteDisabledError } from "@/errors";

const {
  app: { allowUnsafeEval },
} = config;

export function createClient(service?: TranslationService) {
  if (service === TranslationService.libretranslate && allowUnsafeEval !== true) {
    throw new LibreTransalteDisabledError();
  }

  return new TranslationClient({
    service,
    allowUnsafeEval,
  });
}
