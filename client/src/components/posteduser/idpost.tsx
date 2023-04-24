import Like from "./comment_like_share/like";
import Comment from "./comment_like_share/comment";
import Share from "./comment_like_share/share";
import { Link } from "react-router-dom";
import UserComment from "./usercomment/UserComment";
function idpost() {
  return (
    <div className="max-w-4xl mx-auto border border-gray-200 rounded-xl">
      <div className="px-12 py-6">
        <div className="flex justify-between">
          <div className="flex gap-6">
            <div className="flex justify-center items-center w-10 h-10 bg-slate-600 rounded-full text-white ">
              A
            </div>
            <p className="font-semibold">
              Alexiess Manalastas
              <p className="font-thin text-[.75rem] text-gray-500">
                Posted on <span>March, 21 2024</span>
              </p>
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <Like Like={6} />
            <Link to="#comment">
              <Comment comments={2} />
            </Link>
            <Share />
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-[2rem] font-extrabold">
            The Dangers of Enforcing Premature Return to office policy
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare
            quam viverra orci sagittis eu volutpat odio facilisis. Suspendisse
            sed nisi lacus sed. Pharetra diam sit amet nisl suscipit adipiscing.
            Risus ultricies tristique nulla aliquet enim. Neque vitae tempus
            quam pellentesque nec nam. Nunc eget lorem dolor sed. Tellus rutrum
            tellus pellentesque eu. Bibendum at varius vel pharetra vel turpis.
            Mauris ultrices eros in cursus turpis massa tincidunt dui ut.
            Condimentum mattis pellentesque id nibh tortor id aliquet. Urna nunc
            id cursus metus aliquam. Nunc sed velit dignissim sodales. Donec
            pretium vulputate sapien nec sagittis aliquam malesuada bibendum.
            Pharetra pharetra massa massa ultricies mi quis hendrerit dolor.
            Nisl suscipit adipiscing bibendum est ultricies integer. Euismod
            nisi porta lorem mollis aliquam ut porttitor leo. Amet est placerat
            in egestas erat imperdiet sed. Varius sit amet mattis vulputate enim
            nulla aliquet porttitor. Arcu non odio euismod lacinia at quis.
            Imperdiet massa tincidunt nunc pulvinar sapien et ligula
            ullamcorper. Quam adipiscing vitae proin sagittis. Nisi lacus sed
            viverra tellus in hac. Quisque non tellus orci ac auctor augue
            mauris. Sed lectus vestibulum mattis ullamcorper velit sed
            ullamcorper morbi. Sed felis eget velit aliquet sagittis id
            consectetur purus. Nunc sed velit dignissim sodales ut eu sem
            integer vitae. Pretium lectus quam id leo in vitae turpis. Non diam
            phasellus vestibulum lorem sed risus ultricies tristique. Lectus
            vestibulum mattis ullamcorper velit sed. Posuere urna nec tincidunt
            praesent semper feugiat nibh sed. Tortor aliquam nulla facilisi cras
            fermentum odio eu feugiat. Risus ultricies tristique nulla aliquet
            enim tortor. Morbi tristique senectus et netus et. Tellus
            pellentesque eu tincidunt tortor aliquam. Ipsum suspendisse ultrices
            gravida dictum fusce. Aliquet bibendum enim facilisis gravida neque
            convallis. Donec pretium vulputate sapien nec sagittis. Id diam
            maecenas ultricies mi eget mauris pharetra et. Viverra aliquet eget
            sit amet tellus cras. Nec sagittis aliquam malesuada bibendum arcu
            vitae elementum curabitur vitae. Dolor purus non enim praesent
            elementum. Tellus id interdum velit laoreet id donec ultrices
            tincidunt arcu. Morbi tristique senectus et netus et malesuada fames
            ac. Fames ac turpis egestas integer eget. Auctor neque vitae tempus
            quam pellentesque nec nam aliquam. Volutpat lacus laoreet non
            curabitur gravida arcu ac tortor dignissim. Porttitor massa id neque
            aliquam vestibulum morbi. Ornare quam viverra orci sagittis eu
            volutpat. Consectetur adipiscing elit pellentesque habitant morbi.
            Ac turpis egestas sed tempus urna et pharetra pharetra. Consectetur
            purus ut faucibus pulvinar. Neque convallis a cras semper auctor
            neque vitae. Diam sit amet nisl suscipit adipiscing. Nec tincidunt
            praesent semper feugiat nibh sed pulvinar. Gravida quis blandit
            turpis cursus in hac. Eleifend mi in nulla posuere sollicitudin
            aliquam ultrices. Parturient montes nascetur ridiculus mus. Leo duis
            ut diam quam nulla. Ornare aenean euismod elementum nisi quis
            eleifend. Aliquam vestibulum morbi blandit cursus. Sit amet justo
            donec enim diam vulputate ut pharetra sit. Volutpat sed cras ornare
            arcu dui vivamus. Aenean sed adipiscing diam.
          </p>
        </div>
      </div>
      <UserComment id="comment" />
    </div>
  );
}

export default idpost;
