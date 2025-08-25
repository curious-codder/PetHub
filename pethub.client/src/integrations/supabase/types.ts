export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      activitylogs: {
        Row: {
          action: string
          createdat: string | null
          entityid: number | null
          entitytype: string | null
          ipaddress: string | null
          logid: number
          metadata: Json | null
          useragent: string | null
          userid: number | null
        }
        Insert: {
          action: string
          createdat?: string | null
          entityid?: number | null
          entitytype?: string | null
          ipaddress?: string | null
          logid?: never
          metadata?: Json | null
          useragent?: string | null
          userid?: number | null
        }
        Update: {
          action?: string
          createdat?: string | null
          entityid?: number | null
          entitytype?: string | null
          ipaddress?: string | null
          logid?: never
          metadata?: Json | null
          useragent?: string | null
          userid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activitylogs_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
        ]
      }
      conversations: {
        Row: {
          conversationid: number
          createdat: string | null
          isactive: boolean | null
          lastmessageat: string | null
          listingid: number | null
          participant1id: number
          participant2id: number
        }
        Insert: {
          conversationid?: never
          createdat?: string | null
          isactive?: boolean | null
          lastmessageat?: string | null
          listingid?: number | null
          participant1id: number
          participant2id: number
        }
        Update: {
          conversationid?: never
          createdat?: string | null
          isactive?: boolean | null
          lastmessageat?: string | null
          listingid?: number | null
          participant1id?: number
          participant2id?: number
        }
        Relationships: [
          {
            foreignKeyName: "conversations_listingid_fkey"
            columns: ["listingid"]
            isOneToOne: false
            referencedRelation: "petlistings"
            referencedColumns: ["listingid"]
          },
          {
            foreignKeyName: "conversations_participant1id_fkey"
            columns: ["participant1id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
          {
            foreignKeyName: "conversations_participant2id_fkey"
            columns: ["participant2id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
        ]
      }
      messages: {
        Row: {
          conversationid: number
          createdat: string | null
          isread: boolean | null
          listingid: number | null
          messagecontent: string
          messageid: number
          messagetype: string | null
          receiverid: number
          senderid: number
        }
        Insert: {
          conversationid: number
          createdat?: string | null
          isread?: boolean | null
          listingid?: number | null
          messagecontent: string
          messageid?: never
          messagetype?: string | null
          receiverid: number
          senderid: number
        }
        Update: {
          conversationid?: number
          createdat?: string | null
          isread?: boolean | null
          listingid?: number | null
          messagecontent?: string
          messageid?: never
          messagetype?: string | null
          receiverid?: number
          senderid?: number
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversationid_fkey"
            columns: ["conversationid"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["conversationid"]
          },
          {
            foreignKeyName: "messages_listingid_fkey"
            columns: ["listingid"]
            isOneToOne: false
            referencedRelation: "petlistings"
            referencedColumns: ["listingid"]
          },
          {
            foreignKeyName: "messages_receiverid_fkey"
            columns: ["receiverid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
          {
            foreignKeyName: "messages_senderid_fkey"
            columns: ["senderid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
        ]
      }
      notifications: {
        Row: {
          actionurl: string | null
          createdat: string | null
          isread: boolean | null
          message: string
          notificationid: number
          notificationtype: string
          relatedid: number | null
          title: string
          userid: number
        }
        Insert: {
          actionurl?: string | null
          createdat?: string | null
          isread?: boolean | null
          message: string
          notificationid?: never
          notificationtype: string
          relatedid?: number | null
          title: string
          userid: number
        }
        Update: {
          actionurl?: string | null
          createdat?: string | null
          isread?: boolean | null
          message?: string
          notificationid?: never
          notificationtype?: string
          relatedid?: number | null
          title?: string
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "notifications_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
        ]
      }
      petbreeds: {
        Row: {
          averagesize: string | null
          averageweight: string | null
          breedid: number
          breedname: string
          carerequirements: Json | null
          categoryid: number
          createdat: string | null
          description: string | null
          isactive: boolean | null
          lifespan: string | null
          origincountry: string | null
          temperamenttraits: Json | null
        }
        Insert: {
          averagesize?: string | null
          averageweight?: string | null
          breedid?: never
          breedname: string
          carerequirements?: Json | null
          categoryid: number
          createdat?: string | null
          description?: string | null
          isactive?: boolean | null
          lifespan?: string | null
          origincountry?: string | null
          temperamenttraits?: Json | null
        }
        Update: {
          averagesize?: string | null
          averageweight?: string | null
          breedid?: never
          breedname?: string
          carerequirements?: Json | null
          categoryid?: number
          createdat?: string | null
          description?: string | null
          isactive?: boolean | null
          lifespan?: string | null
          origincountry?: string | null
          temperamenttraits?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "petbreeds_categoryid_fkey"
            columns: ["categoryid"]
            isOneToOne: false
            referencedRelation: "petcategories"
            referencedColumns: ["categoryid"]
          },
        ]
      }
      petcategories: {
        Row: {
          categoryid: number
          categoryname: string
          createdat: string | null
          description: string | null
          iconurl: string | null
          isactive: boolean | null
        }
        Insert: {
          categoryid?: never
          categoryname: string
          createdat?: string | null
          description?: string | null
          iconurl?: string | null
          isactive?: boolean | null
        }
        Update: {
          categoryid?: never
          categoryname?: string
          createdat?: string | null
          description?: string | null
          iconurl?: string | null
          isactive?: boolean | null
        }
        Relationships: []
      }
      petimages: {
        Row: {
          caption: string | null
          createdat: string | null
          imageid: number
          imageurl: string
          isprimary: boolean | null
          listingid: number
          sortorder: number | null
        }
        Insert: {
          caption?: string | null
          createdat?: string | null
          imageid?: never
          imageurl: string
          isprimary?: boolean | null
          listingid: number
          sortorder?: number | null
        }
        Update: {
          caption?: string | null
          createdat?: string | null
          imageid?: never
          imageurl?: string
          isprimary?: boolean | null
          listingid?: number
          sortorder?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "petimages_listingid_fkey"
            columns: ["listingid"]
            isOneToOne: false
            referencedRelation: "petlistings"
            referencedColumns: ["listingid"]
          },
        ]
      }
      petlistings: {
        Row: {
          age: string | null
          breedid: number | null
          categoryid: number
          color: string | null
          createdat: string | null
          currency: string | null
          description: string | null
          featureduntil: string | null
          gender: string | null
          healthstatus: string | null
          isnegotiable: boolean | null
          isneutered: boolean | null
          likecount: number | null
          listingid: number
          location: string | null
          petname: string
          price: number
          sellerid: number
          shopid: number | null
          size: string | null
          specialneeds: string | null
          status: string | null
          updatedat: string | null
          vaccinationstatus: string | null
          viewcount: number | null
        }
        Insert: {
          age?: string | null
          breedid?: number | null
          categoryid: number
          color?: string | null
          createdat?: string | null
          currency?: string | null
          description?: string | null
          featureduntil?: string | null
          gender?: string | null
          healthstatus?: string | null
          isnegotiable?: boolean | null
          isneutered?: boolean | null
          likecount?: number | null
          listingid?: never
          location?: string | null
          petname: string
          price: number
          sellerid: number
          shopid?: number | null
          size?: string | null
          specialneeds?: string | null
          status?: string | null
          updatedat?: string | null
          vaccinationstatus?: string | null
          viewcount?: number | null
        }
        Update: {
          age?: string | null
          breedid?: number | null
          categoryid?: number
          color?: string | null
          createdat?: string | null
          currency?: string | null
          description?: string | null
          featureduntil?: string | null
          gender?: string | null
          healthstatus?: string | null
          isnegotiable?: boolean | null
          isneutered?: boolean | null
          likecount?: number | null
          listingid?: never
          location?: string | null
          petname?: string
          price?: number
          sellerid?: number
          shopid?: number | null
          size?: string | null
          specialneeds?: string | null
          status?: string | null
          updatedat?: string | null
          vaccinationstatus?: string | null
          viewcount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "petlistings_breedid_fkey"
            columns: ["breedid"]
            isOneToOne: false
            referencedRelation: "petbreeds"
            referencedColumns: ["breedid"]
          },
          {
            foreignKeyName: "petlistings_categoryid_fkey"
            columns: ["categoryid"]
            isOneToOne: false
            referencedRelation: "petcategories"
            referencedColumns: ["categoryid"]
          },
          {
            foreignKeyName: "petlistings_sellerid_fkey"
            columns: ["sellerid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
          {
            foreignKeyName: "petlistings_shopid_fkey"
            columns: ["shopid"]
            isOneToOne: false
            referencedRelation: "petshops"
            referencedColumns: ["shopid"]
          },
        ]
      }
      petshops: {
        Row: {
          address: string | null
          businesslicense: string | null
          city: string | null
          country: string | null
          createdat: string | null
          description: string | null
          email: string | null
          isactive: boolean | null
          isverified: boolean | null
          logo: string | null
          ownerid: number
          phonenumber: string | null
          postalcode: string | null
          rating: number | null
          shopid: number
          shopname: string
          state: string | null
          taxid: string | null
          totalreviews: number | null
          updatedat: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          businesslicense?: string | null
          city?: string | null
          country?: string | null
          createdat?: string | null
          description?: string | null
          email?: string | null
          isactive?: boolean | null
          isverified?: boolean | null
          logo?: string | null
          ownerid: number
          phonenumber?: string | null
          postalcode?: string | null
          rating?: number | null
          shopid?: never
          shopname: string
          state?: string | null
          taxid?: string | null
          totalreviews?: number | null
          updatedat?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          businesslicense?: string | null
          city?: string | null
          country?: string | null
          createdat?: string | null
          description?: string | null
          email?: string | null
          isactive?: boolean | null
          isverified?: boolean | null
          logo?: string | null
          ownerid?: number
          phonenumber?: string | null
          postalcode?: string | null
          rating?: number | null
          shopid?: never
          shopname?: string
          state?: string | null
          taxid?: string | null
          totalreviews?: number | null
          updatedat?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "petshops_ownerid_fkey"
            columns: ["ownerid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
        ]
      }
      reports: {
        Row: {
          adminnotes: string | null
          createdat: string | null
          reason: string
          reportedlistingid: number | null
          reporteduserid: number | null
          reporterid: number
          reportid: number
          reporttype: string
          status: string | null
          updatedat: string | null
        }
        Insert: {
          adminnotes?: string | null
          createdat?: string | null
          reason: string
          reportedlistingid?: number | null
          reporteduserid?: number | null
          reporterid: number
          reportid?: never
          reporttype: string
          status?: string | null
          updatedat?: string | null
        }
        Update: {
          adminnotes?: string | null
          createdat?: string | null
          reason?: string
          reportedlistingid?: number | null
          reporteduserid?: number | null
          reporterid?: number
          reportid?: never
          reporttype?: string
          status?: string | null
          updatedat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_reportedlistingid_fkey"
            columns: ["reportedlistingid"]
            isOneToOne: false
            referencedRelation: "petlistings"
            referencedColumns: ["listingid"]
          },
          {
            foreignKeyName: "reports_reporteduserid_fkey"
            columns: ["reporteduserid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
          {
            foreignKeyName: "reports_reporterid_fkey"
            columns: ["reporterid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
        ]
      }
      reviews: {
        Row: {
          createdat: string | null
          isverifiedpurchase: boolean | null
          listingid: number | null
          rating: number
          reviewcontent: string | null
          revieweeid: number
          reviewerid: number
          reviewid: number
          reviewtitle: string | null
          shopid: number | null
          updatedat: string | null
        }
        Insert: {
          createdat?: string | null
          isverifiedpurchase?: boolean | null
          listingid?: number | null
          rating: number
          reviewcontent?: string | null
          revieweeid: number
          reviewerid: number
          reviewid?: never
          reviewtitle?: string | null
          shopid?: number | null
          updatedat?: string | null
        }
        Update: {
          createdat?: string | null
          isverifiedpurchase?: boolean | null
          listingid?: number | null
          rating?: number
          reviewcontent?: string | null
          revieweeid?: number
          reviewerid?: number
          reviewid?: never
          reviewtitle?: string | null
          shopid?: number | null
          updatedat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_listingid_fkey"
            columns: ["listingid"]
            isOneToOne: false
            referencedRelation: "petlistings"
            referencedColumns: ["listingid"]
          },
          {
            foreignKeyName: "reviews_revieweeid_fkey"
            columns: ["revieweeid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
          {
            foreignKeyName: "reviews_reviewerid_fkey"
            columns: ["reviewerid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
          {
            foreignKeyName: "reviews_shopid_fkey"
            columns: ["shopid"]
            isOneToOne: false
            referencedRelation: "petshops"
            referencedColumns: ["shopid"]
          },
        ]
      }
      systemsettings: {
        Row: {
          createdat: string | null
          datatype: string | null
          description: string | null
          isactive: boolean | null
          settingid: number
          settingkey: string
          settingvalue: string | null
          updatedat: string | null
        }
        Insert: {
          createdat?: string | null
          datatype?: string | null
          description?: string | null
          isactive?: boolean | null
          settingid?: never
          settingkey: string
          settingvalue?: string | null
          updatedat?: string | null
        }
        Update: {
          createdat?: string | null
          datatype?: string | null
          description?: string | null
          isactive?: boolean | null
          settingid?: never
          settingkey?: string
          settingvalue?: string | null
          updatedat?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          buyerid: number
          completedat: string | null
          createdat: string | null
          currency: string | null
          listingid: number
          notes: string | null
          paymentmethod: string | null
          paymentreference: string | null
          paymentstatus: string | null
          sellerid: number
          transactionid: number
          transactionstatus: string | null
          updatedat: string | null
        }
        Insert: {
          amount: number
          buyerid: number
          completedat?: string | null
          createdat?: string | null
          currency?: string | null
          listingid: number
          notes?: string | null
          paymentmethod?: string | null
          paymentreference?: string | null
          paymentstatus?: string | null
          sellerid: number
          transactionid?: never
          transactionstatus?: string | null
          updatedat?: string | null
        }
        Update: {
          amount?: number
          buyerid?: number
          completedat?: string | null
          createdat?: string | null
          currency?: string | null
          listingid?: number
          notes?: string | null
          paymentmethod?: string | null
          paymentreference?: string | null
          paymentstatus?: string | null
          sellerid?: number
          transactionid?: never
          transactionstatus?: string | null
          updatedat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_buyerid_fkey"
            columns: ["buyerid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
          {
            foreignKeyName: "transactions_listingid_fkey"
            columns: ["listingid"]
            isOneToOne: false
            referencedRelation: "petlistings"
            referencedColumns: ["listingid"]
          },
          {
            foreignKeyName: "transactions_sellerid_fkey"
            columns: ["sellerid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
        ]
      }
      userfavorites: {
        Row: {
          createdat: string | null
          favoriteid: number
          listingid: number
          userid: number
        }
        Insert: {
          createdat?: string | null
          favoriteid?: never
          listingid: number
          userid: number
        }
        Update: {
          createdat?: string | null
          favoriteid?: never
          listingid?: number
          userid?: number
        }
        Relationships: [
          {
            foreignKeyName: "userfavorites_listingid_fkey"
            columns: ["listingid"]
            isOneToOne: false
            referencedRelation: "petlistings"
            referencedColumns: ["listingid"]
          },
          {
            foreignKeyName: "userfavorites_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
        ]
      }
      userprofiles: {
        Row: {
          bio: string | null
          createdat: string | null
          location: string | null
          preferredcontactmethod: string | null
          profileid: number
          socialmedialinks: Json | null
          updatedat: string | null
          userid: number
          website: string | null
        }
        Insert: {
          bio?: string | null
          createdat?: string | null
          location?: string | null
          preferredcontactmethod?: string | null
          profileid?: never
          socialmedialinks?: Json | null
          updatedat?: string | null
          userid: number
          website?: string | null
        }
        Update: {
          bio?: string | null
          createdat?: string | null
          location?: string | null
          preferredcontactmethod?: string | null
          profileid?: never
          socialmedialinks?: Json | null
          updatedat?: string | null
          userid?: number
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "userprofiles_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["userid"]
          },
        ]
      }
      users: {
        Row: {
          createdat: string | null
          email: string
          firstname: string
          isactive: boolean | null
          isemailverified: boolean | null
          lastname: string
          passwordhash: string
          phone: string | null
          profilepicture: string | null
          updatedat: string | null
          userid: number
          usertype: string | null
        }
        Insert: {
          createdat?: string | null
          email: string
          firstname: string
          isactive?: boolean | null
          isemailverified?: boolean | null
          lastname: string
          passwordhash?: string
          phone?: string | null
          profilepicture?: string | null
          updatedat?: string | null
          userid?: never
          usertype?: string | null
        }
        Update: {
          createdat?: string | null
          email?: string
          firstname?: string
          isactive?: boolean | null
          isemailverified?: boolean | null
          lastname?: string
          passwordhash?: string
          phone?: string | null
          profilepicture?: string | null
          updatedat?: string | null
          userid?: never
          usertype?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
