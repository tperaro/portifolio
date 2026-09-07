import Flow from './Flow';
import Decision from './Decision';
import Compare from './Compare';
import OrgChart from './OrgChart';
import Callout from './Callout';
import DoDont from './DoDont';
import BarChart from './BarChart';
import Terminal from './Terminal';
import Link from '../../atoms/Link';

/**
 * Componentes disponíveis dentro do markdown de um guia. Usados como tags
 * auto-fecháveis: <Flow items="a :: b | c :: d" />
 */
export const guideOverrides = {
    Flow: { component: Flow },
    Decision: { component: Decision },
    Compare: { component: Compare },
    OrgChart: { component: OrgChart },
    Callout: { component: Callout },
    DoDont: { component: DoDont },
    BarChart: { component: BarChart },
    Terminal: { component: Terminal },
    a: { component: Link }
};
