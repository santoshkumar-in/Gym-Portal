import Business from "@/components/Business";

interface Props {
  businessId: string;
}
const BusinessDashboard = ({ businessId }: Props) => {
  return <Business businessId={businessId} />;
};

export default BusinessDashboard;
