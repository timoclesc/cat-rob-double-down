import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { buildConfig } from "payload"
import { fileURLToPath } from "url"
import {
  integer,
  pgTable,
  uniqueIndex,
  timestamp,
  text,
} from '@payloadcms/db-vercel-postgres/drizzle/pg-core'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    {
      slug: "users",
      auth: true,
      access: {
        delete: () => false,
        update: () => false,
      },
      fields: [
        {
          name: "name",
          type: "text",
        },
      ],
    },
    {
      slug: "hero",
      admin: {
        useAsTitle: "title",
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "subtitle",
          type: "textarea",
          required: true,
        },
        {
          name: "ctaText",
          type: "text",
          required: true,
        },
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      slug: "story",
      admin: {
        useAsTitle: "sectionTitle",
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: "sectionTitle",
          type: "text",
          required: true,
        },
        {
          name: "sectionSubtitle",
          type: "text",
        },
        {
          name: "storyTitle",
          type: "text",
          required: true,
        },
        {
          name: "storyContent",
          type: "richText",
          editor: lexicalEditor({}),
          required: true,
        },
        {
          name: "twistTitle",
          type: "text",
          required: true,
        },
        {
          name: "twistContent",
          type: "richText",
          editor: lexicalEditor({}),
          required: true,
        },
        {
          name: "eventName",
          type: "text",
          required: true,
        },
        {
          name: "eventDate",
          type: "text",
          required: true,
        },
        {
          name: "eventDistance",
          type: "text",
          required: true,
        },
        {
          name: "eventLocation",
          type: "text",
          required: true,
        },
      ],
    },
    {
      slug: "updates",
      dbName: "training_updates",
      admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "date", "updatedAt"],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "content",
          type: "textarea",
          required: true,
        },
        {
          name: "date",
          type: "date",
          required: true,
          admin: {
            date: {
              pickerAppearance: "dayOnly",
            },
          },
        },
      ],
    },
    {
      slug: "media",
      upload: {
        staticDir: "media",
        imageSizes: [
          {
            name: "thumbnail",
            width: 400,
            height: 300,
            position: "centre",
          },
          {
            name: "card",
            width: 768,
            height: 1024,
            position: "centre",
          },
          {
            name: "tablet",
            width: 1024,
            height: undefined,
            position: "centre",
          },
        ],
        adminThumbnail: "thumbnail",
        mimeTypes: ["image/*"],
      },
      fields: [
        {
          name: "alt",
          type: "text",
        },
      ],
      access: {
        read: () => true,
      },
    },
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    beforeSchemaInit: [
    ({ schema }) => {
      return {
        ...schema,
        tables: {
          ...schema.tables,
          pledges: pgTable('pledges', {
            id: text('id').primaryKey(),
            donor_name: text('donor_name').notNull(),
            donor_email: text('donor_email'),
            amount: integer('amount').notNull(),
            charity_name: text('charity_name').notNull(),
            bet_choice: text('bet_choice').notNull(),
            created_at: timestamp('created_at').notNull(),
          }),
        },
      }
    },
  ],
  }),
})
