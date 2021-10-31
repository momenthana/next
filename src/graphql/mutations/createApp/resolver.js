import App from "@/models/app"

export const createApp = async (_, args) => {
  const app = App(args.input)
  await app.save()

  return true
}
