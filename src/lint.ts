import lint from '@commitlint/lint';
import { ParserOptions } from '@commitlint/types';
import { loadConfig } from './config';
import { updateStatusBar } from './statusBar';

export async function runLint(text: string, filePath: string) {
  const config = await loadConfig(filePath);

  const ruleCount = Object.keys(config.rules).length;
  updateStatusBar(ruleCount);

  return lint(
    text,
    config.rules,
    config.parserPreset
      ? { parserOpts: config.parserPreset.parserOpts as ParserOptions }
      : {},
  );
}
