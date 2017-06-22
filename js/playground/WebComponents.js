import Telescope from '../components/lib'
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get('window')

var React = require('React');


class WebComponents extends React.Component {

    render() {
        const post = {
            "id": "6TuxyB9xp0",
            "url": "http://www.thehindu.com/opinion/interview/there-is-a-feeling-that-now-the-northeast-will-grow/article18552696.ece",
            "title": "There is a feeling now that the Northeast will grow: Sarbananda Sonowal",
            "slug": "there-is-a-feeling-now-that-the-northeast-will-grow-sarbananda-sonowal",
            "body": "In a clear signal that the BJP-led Central government intends to focus on the Northeast, Prime Minister Narendra Modi will unveil the three-year completion celebrations of his government with a rally at the Khanapara ground in Guwahati on May 26. As he personally monitors preparations for the Prime Minister’s visit, with roads in the city getting spruced up, Chief Minister Sarbananda Sonowal also marks a milestone of his own — completing one year on Wednesday of helming the BJP government in Assam. He tells The Hindu that his larger agenda of governance is driven by four points — of achieving a corruption-free, pollution-free, terrorism-free, and foreigner-free Assam. Here are excerpts from a wide-ranging interview:Printable version | Jun 15, 2017 9:30:12 PM | http://www.thehindu.com/opinion/interview/there-is-a-feeling-that-now-the-northeast-will-grow/article18552696.ece\n\nThis is a very exciting and learning experience for me because running a State government is the biggest challenge in anyone’s political career. But I have the",
            "sourceFrom": "thehindu.com",
            "thumbnailUrl": "http://www.thehindu.com/opinion/interview/article18552694.ece/alternates/FREE_1140/TH24INTERVIEWSONOWAL1",
            "userId": "yv57iwi6Zq8jaM7uD",
            "author": "the-hindu",
            "status": 2,
            "topics": [{
                "id": "QtcFhZOrf4",
                "name": "Interview",
                "slug": "interview",
                "status": 1,
                "isIgnore": false,
                "active": false
            }, {
                "id": "JHZIF5LwP2",
                "name": "Comment",
                "slug": "comment",
                "status": 1,
                "isIgnore": false,
                "active": false
            }, {
                "id": "GE5YTlvXHr",
                "name": "Opinion",
                "slug": "opinion",
                "status": 1,
                "isIgnore": true,
                "active": false
            }, {
                "id": "nbpiIdWb14",
                "name": "Newsletter",
                "slug": "newsletter",
                "status": 1,
                "isIgnore": true,
                "active": false
            }],
            "cloudinaryUrls": [{
                "name": "small",
                "url": "http://res.cloudinary.com/politicl/image/upload/s--066X_vut--/c_fill,f_auto,h_100,q_auto,w_100/qi9vmhxwmh6xltf8rwzo.jpg"
            }],
            "postedAt": "2017-06-15T16:00:28.289Z"
        }
        return (
            <View style={{
                flex: 1,
                width: width,
                height: height,
                backgroundColor: '#f9f9f9'
            }}>
                {/*<Telescope.components.PostsLoadMore loadMore={'load djzhang'}/>*/}
                {/*<Telescope.components.PostsNoResults />*/}
                {/*<Telescope.components.PostsListTitle title={"xxx"} showClose={true}/>*/}
                {/*<Telescope.components.PostsItem post={post} type="save"/>*/}
                {/*<Telescope.components.PostsHome />*/}
                <Telescope.components.GeneralLoginList />
            </View>
        )
    }
}

module.exports = WebComponents;
