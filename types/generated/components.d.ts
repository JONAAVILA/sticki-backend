import type { Schema, Struct } from '@strapi/strapi';

export interface FragrancePerfume extends Struct.ComponentSchema {
  collectionName: 'components_fragrance_perfumes';
  info: {
    displayName: 'perfume';
    icon: 'archive';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    paused: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    price: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0>;
    stock: Schema.Attribute.Integer & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'fragrance.perfume': FragrancePerfume;
    }
  }
}
