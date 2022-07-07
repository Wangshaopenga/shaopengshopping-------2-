import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import {
    Image as VanImage,
    Badge,
    Button,
    Card,
    CellGroup,
    Collapse,
    CollapseItem,
    Field,
    Form,
    Lazyload,
    Notify,
    Sidebar,
    SidebarItem,
    Swipe,
    SwipeItem,
    Tab,
    Tabs,
    Toast,
    Tag,
    Skeleton,
    Dialog,
    Stepper,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox,
    SwipeCell,
    Cell,
    ActionBarButton,
    ActionBarIcon,
    ActionBar,
    Empty,
    SubmitBar,
    AddressList,
    AddressEdit,
    Area,
    ContactCard,
    Icon,
    Divider,
    Popup,
    Grid,
    GridItem,
    List,
    PullRefresh,
    Sticky
} from 'vant'

const app = createApp(App);
app.use(Form);
app.use(AddressList);
app.use(AddressEdit);
app.use(Area);
app.use(Field);
app.use(Icon);
app.use(Divider);
app.use(Popup);
app.use(Sticky);
app.use(Cell);
app.use(ActionBar);
app.use(List);
app.use(PullRefresh);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(CellGroup);
app.use(ContactCard);
app.use(Checkbox);
app.use(Grid);
app.use(GridItem);
app.use(Empty);
app.use(CheckboxGroup);
app.use(SubmitBar);
app.use(Notify);
app.use(Toast);
app.use(SwipeCell);
app.use(Stepper);
app.use(Radio);
app.use(RadioGroup);
app.use(Swipe);
app.use(Button);
app.use(Skeleton);
app.use(Dialog);
app.use(Badge);
app.use(Collapse);
app.use(CollapseItem);
app.use(Tag);
app.use(Sidebar);
app.use(SidebarItem);
app.use(Lazyload, {
    loading: require('./assets/images/s3.jpg')
});
app.use(SwipeItem);
app.use(Tab);
app.use(Tabs);
app.use(Card);
app.use(VanImage);
app.use(store);
app.use(router);
app.mount('#app')