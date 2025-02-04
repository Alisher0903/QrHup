import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
  child?: React.ReactNode;
}

const Breadcrumb = ({ pageName , child }: BreadcrumbProps) => {
  const { t } = useTranslation()
  return (
    <div className="">
      <nav>
        <ol className="flex items-center gap-2 mb-3">
          <li className='text-[15px] md:text-title-md'>
            <Link className="font-medium" to="/">
              {t('Dashboard')} /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black">
          {pageName}
        </h2>
        {child}
      </div>
    </div>
  );
};

export default Breadcrumb;
