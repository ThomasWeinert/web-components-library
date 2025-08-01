interface AttributeChangeDetail {
  attributeName: string;
  attributeOldValue?: string | null;
  attributeValue?: string | null;
}

export class AttributeChangeEvent extends CustomEvent<AttributeChangeDetail> {

  public constructor(
    type: string,
    attributeChange: AttributeChangeDetail,
    eventInitDict?: EventInit,
  ) {
    super(type, {
      ...eventInitDict, detail: attributeChange,
    });
  }

}
