import { Spinner } from 'cli-spinner'

import { LOG } from '@/helpers/log'

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

class LoaderHelper {
  static readonly SENTENCES = [
    'This process takes time, please go for a coffee (or a fruit juice)',
    'This may take a while, grab a drink and come back later',
    'Go for a walk, this action takes time',
    "That may take some time, let's chill and relax",
    'Leon will be ready for you in a moment'
  ]

  private static instance: LoaderHelper

  private spinner = new Spinner('\x1b[95m%s\x1b[0m\r').setSpinnerString(18)

  private interval: NodeJS.Timer | undefined

  private constructor() {
    // Singleton
  }

  public static getInstance() {
    if (LoaderHelper.instance == null) {
      LoaderHelper.instance = new LoaderHelper()
    }

    return LoaderHelper.instance
  }

  /**
   * Start the loader
   */
  public start() {
    this.interval = setInterval(() => {
      if (this.spinner.isSpinning()) {
        const randomSentenceIndex = randomNumber(
          0,
          LoaderHelper.SENTENCES.length - 1
        )
        const randomSentence = LoaderHelper.SENTENCES[randomSentenceIndex]

        LOG.info(randomSentence ?? 'Loading...')
      }
    }, 60_000)

    this.spinner.start()
  }

  /**
   * Stop the loader
   */
  public stop() {
    clearInterval(this.interval)

    this.spinner.stop()
  }
}

export const LOADER = LoaderHelper.getInstance()
