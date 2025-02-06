import BusinessInfoWrapper from "./BusinessInfoInner";
interface BasicInfoFormProps {
  businessId: string;
}

const BasicInfoForm = async ({
  params,
}: {
  params: Promise<BasicInfoFormProps>;
}) => {
  const { businessId } = await params;
  return <BusinessInfoWrapper businessId={businessId} />;
};

export default BasicInfoForm;
