# 202130311 안상하 

## 2025.06.05 14주차
**기존 프로젝트에 React 추가**  
**2단계: 페이지 어디에서든 React 컴포넌트 렌더링하기**
* 이전 단계에서는 메인 파일 최상단에 아래 코드를 넣었음
  ~~~js
    import {createRoot} from "react-dom/client";

    //기존 HTML 콘텐츠를 지움
    document.body.innerHTML = '<div id="app"></div>';
    //대신에 작성한 React 컴포넌트를 렌더링
    const root = createRoot(document.getElementById('app'));
    root.render(<h1>Hello, world</h1>);
  ~~~
* 실제로는 기존 HTML 콘텐츠를 지우고 싶지 않을 것
* HTML 페이지를 열고(또는 이를 생성하는 서버 탬플릿) HTML 태그에 고유한 id 어트리뷰트를 추가
  ~~~js
    <!-- ... html의 어딘가 ... -->
    <nav id="navigation"></nav>
    <!-- ... 더 많은 html ... -->
  ~~~
* `document.getElementById`로 HTML 엘리먼트를 찾아 createRoot에 전달함으로써 해당 요소 내부에 React 컴포넌트를 렌더링할 수 있음
  ~~~js
    import { createRoot } from 'react-dom/client';

    function NavigationBar() {
      // TODO: 실제로 네비게이션 바를 구현합니다.
      return <h1>Hello from React!</h1>;
    }

    const domNode = document.getElementById('navigation');
    const root = createRoot(domNode);
    root.render(<NavigationBar />);
  ~~~
* 기존에 존재하던 `index.html`의 원본 HTML 컨텐츠가 그대로 남아있는 것을 확인할 수 있음
* 하지만 이제는 `<nav id="navigation">` 안에 직접 작성한 `NavigationBar React` 컴포넌트가 나타남
* 기존 프로젝트에서 React를 도입할 때, 일반적으로 작은 상호작용 컴포넌트(예시: 버튼)에서 시작하여 점진적으로 “상위 구조로 확장하면서” 결국에는 전체 페이지가 React로 빌드될 때까지 이 과정을 반복하게 됨

**에디터 설정하기**
1. Linting
* 코드 린터는 코드를 작성하는 동안 실시간으로 문제를 찾아 빠른 문제 해결을 도와줌
* 자바스크립트를 위한 오픈 소스 린터인 `ESLint`를 가장 많이 사용
2. Formatting
* `Prettier`를 사용하면 직접 지정해 놓은 규칙들에 부합하도록 코드의 형식을 깔끔하게 정리할 수 있음
* 모든 탭은 공백으로 전환될 뿐만 아니라 들여쓰기, 따옴표 형식과 같은 요소들이 전부 설정에 부합하도록 수정될 것
* 다음과 같은 단계를 통해 VS Code의 Prettier 익스텐션을 설치할 수 있음
  1. VS Code 실행하기
  2. 퀵오픈 사용하기 (Ctrl/Cmd+P 누르기)
  3. ext install esbenp.prettier-vscode라고 입력하기
  4. 엔터 누르기
**TypeScript 사용하기**
* TypeScript는 JavaScript 코드 베이스에 타입 정의를 추가하는 데 널리 사용되는 방법
* 기본적으로 TypeScript는 `JSX`를 지원하며, `@types/react` 및 `@types/react-dom`을 추가하면 완전한 React Web 지원을 받을 수 있음

**기존 React 프로젝트에 TypeScript 추가하기**
* 최신 버전의 React 타입 정의를 설치
  ~~~
    npm install @types/react @types/react-dom
  ~~~
* 다음 컴파일러 옵션을 tsconfig.json에 설정
  1. dom은 lib에 포함되어야 함(주의: lib 옵션이 지정되지 않으면, 기본적으로 dom이 포함됨)
  2. jsx를 유효한 옵션 중 하나로 설정해야 함 대부분의 애플리케이션에서는 `preserve`로 충분

**React 컴포넌트가 있는 TypeScript**
* React와 함께 TypeScript를 작성하는 것은 React와 함께 JavaScript를 작성하는 것과 매우 유사
* 컴포넌트로 작업할 때 가장 중요한 차이점은 컴포넌트의 props에 타입을 제공할 수 있다는 점
* 이러한 타입은 에디터에서 정확성을 검사하고 인라인 문서를 제공하는 데 사용할 수 있음
* 빠르게 시작하기 가이드에서 가져온 `MyButton` 컴포넌트를 예로 들어 버튼의 `title`을 설명하는 타입을 추가할 수 있음
  ~~~js
    function MyButton({ title }: { title: string }) {
      return (
        <button>{title}</button>
      );
    }

    export default function MyApp() {
      return (
        <div>
          <h1>Welcome to my app</h1>
          <MyButton title="I'm a button" />
        </div>
      );
    }
  ~~~
* 인라인 문법은 컴포넌트에 타입을 제공하는 가장 간단한 방법이지만, 설명할 필드가 많아지기 시작하면 다루기 어려워질 수 있음
* 대신, `interface`나 `type`을 사용하여 컴포넌트의 `props`를 설명할 수 있음
  ~~~js
    interface MyButtonProps {
      /** 버튼 안에 보여질 텍스트 */
      title: string;
      /** 버튼이 상호작용할 수 있는지 여부 */
      disabled: boolean;
    }

    function MyButton({ title, disabled }: MyButtonProps) {
      return (
        <button disabled={disabled}>{title}</button>
      );
    }

    export default function MyApp() {
      return (
        <div>
          <h1>Welcome to my app</h1>
          <MyButton title="I'm a disabled button" disabled={true}/>
        </div>
      );
    }
  ~~~
**useState**
* useState hook은 초기 state로 전달된 값을 재사용하여 값의 타입을 결정
~~~js
//예를 들면
// 타입을 "boolean"으로 추론합니다
const [enabled, setEnabled] = useState(false);
~~~

* `boolean` 타입이 `enabled`에 할당되고, `setEnabled` 는 `boolean` 인수나 `boolean`을 반환하는 함수를 받는 함수가 됨
* state에 대한 타입을 명시적으로 제공하려면 useState 호출에 타입 인수를 제공하면 됨
~~~js
// 명시적으로 타입을 "boolean"으로 설정합니다
const [enabled, setEnabled] = useState<boolean>(false);
~~~

* 이 경우에는 그다지 유용하지 않지만, 타입 제공을 원하게 되는 일반적인 경우는 유니언 타입이 있는 경우
* 예를 들어 여기서 status는 몇 가지 다른 문자열 중 하나일 수 있음
~~~js
  type Status = "idle" | "loading" | "success" | "error";
  const [status, setStatus] = useState<Status>("idle");
~~~

* 또는 State 구조화 원칙에서 권장하는 대로, 관련 state를 객체로 그룹화하고 객체 타입을 통해 다른 가능성을 설명할 수 있음
~~~js
  type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: any }
  | { status: 'error', error: Error };

  const [requestState, setRequestState] = useState<RequestState>({ status: 'idle' });
~~~

**GitHub Pages 기본 저장소란?**
* GitHub Pages를 운영하려면 먼저 GitHub Pages 저장소를 생성
* 생성 방법은 일반 저장소 생성과 동일하지만 저장소 이름은 도메인 형태로 해야 함
* 또한 최상위 도메인 부분은 `.com`이 아니라 `.io`로 해야 함
* GitHub에서 직접 저장소를 만들었다면 clone해서 local에서 작업하고 push
* 처음부터 저장소를 local에서 만들었다면 그대로 push
* 이 저장소는 GitHub에서 정적 호스팅을 하기 위해서는 반드시 필요한 저장소
* 이후 다른 이름의 저장소도 페이지로 사용할 수 있음. 단 페이지로 사용할 저장소가 있다면 설정에서 페이지를 활성화 해야 함

**배포할 프로젝트 저장소 생성**
* Working directory에 프로젝트를 새로 만들고 README.md를 간단히 수정
* 프로젝트를 GitHub로 push, 저장소는 pubilc으로 해야 함
* GitHub에서 프로젝트 저장소에서 Settings > Pages의 None를 클릭
* Select branch에서 main(master)를 선택하고 저장
* 1~2분 후에 `<id>.github.io/<Repo-name>`으로 접속하면 README를 확인할 수 있음
* 프로젝트 build를 하기 전이기 때문에 README만 확인할 수 있음 

## 2025.05.29 13주차
**처음부터 React 앱 만들기**     
2. 스트리밍 서버 측 렌더링(SSR)은 서버에서 페이지를 렌더링하고 완전히 렌더링된 페이지를 클라이언트로 전송합니다.     
* SSR은 성능을 향상시킬 수 있지만 단일 페이지 앱보다 설정 및 유지 관리가 더 복잡할 수 있습니다.
* 특히 스트리밍 기능이 추가되면 SSR은 설정 및 유지 관리가 매우 복잡해질 수 있습니다.
* vite SSR 가이드 참조   
  
3. 정적 사이트 생성(SSG)은 빌드 시점에 앱의 모든 정적 HTML 파일을 생성합니다.
* SSG는 성능을 향상시킬 수 있지만 서버 측 렌더링(SSR)보다 설정 및 유지 관리가 더 복잡할 수 있습니다.
* vite SSG 가이드 참조  
    
4. React Server Components(RSC)를 사용하면 빌드 타임, 서버 전용, 인터랙티브 컴포넌트를 단일 React 트리에 포함할 수 있습니다.
* RSC는 성능을 향상시킬 수 있지만, 현재 설정 및 유지 관리에 대한 전문 지식이 필요
* Parcel의 RSC 예시 참조
* 렌더링 전략은 라우터와 통합되어야 프레임워크로 빌드된 앱이 경로별로 렌더링 전략을 선택할 수 있음
* 이를 통해 앱 전체를 다시 작성하지 않고도 다양한 렌더링 전략을 사용할 수 있음
* 예를 들어 앱의 랜딩 페이지는 정적으로 생성되는 SSG(정적 생성) 방식이 유리할 수 있지만 콘텐츠 피드가 있는 페이지는 서버 측 렌더링이 가장 효과적일 수 있음
  * 콘텐츠 피드란 사용자들이 자주 업데이트되는 콘텐츠를 쉽게 받아볼 수 있도록 제공되는 데이터 형식 또는 스트림을 의미
* 올바른 경로에 적합한 렌더링 전략을 사용하면
  * 콘텐츠의 첫 바이트를 로드하는 데 걸리는 시간(첫 번째 바이트까지의 시간),
  * 콘텐츠의 첫 번째 부분을 렌더링하는 데 걸리는 시간 (첫 번째 콘텐츠 페인트),
  * 앱에서 가장 큰 표시 콘텐츠를 렌더링하는 데 걸리는 시간 (가장 큰 콘텐츠 페인트)을 줄일 수 있음

**기존 프로젝트에 React 추가**
* 기존 프로젝트에 인터랙티브 기능을 추가하고 싶다면 React로 프로젝트를 다시 작성할 필요는 없음
  * 인터랙티브 기능이란 사용자와 시스템 간의 상호 작용을 가능하게 하는 기능을 말함
* 기존 스택에 React를 추가하고 어디에서나 인터랙티브 React 컴포넌트를 렌더링
**기존 웹사이트의 전체 하위 경로에 React 사용**
* Rails와 같은 다른 서버 기술로 구축 한 기존 웹 앱(example.com)이 있고 example.com/some-app/로 시작하는 모든 경로를 React로 완전히 구현하고 싶다고 가정한다면
* 설정방법은 다음과 같음
  1. React 기반 프레임워크 중 하나를 사용하여 앱의 React 부분을 빌드
  2. 프레임워크 설정에서 기본 경로를 /some-app로 지정
  3. /some-app/ 하위의 모든 요처잉 React 앱에서 처리 되도록 서버나 프록시를 설정
* 이런 방법으로 앱의 React 부분에 해당 프레임워크에 포함된 모범 사례의 장점을 활용할 수 있음 
* 많은 React 기반의 프레임워크는 풀스택이며 React 앱이 서버를 활용할 수 있도록 함
* 그러나 서버에서 자바스크립트를 실행할 수 없거나 실행하고 싶지 않은 경우에도 동일한 접근방식을 사용할 수 있음
  * 이 경우에는 HTML/CSS/JS 내보내기를 /some-app/에서 대신 제공하면 됨
    * Next.js의 경우 next export output, Gatsby의 경우 기본값
**기존 페이지 일부분에 React 사용하기**
* 이미 다른 기술(Rails와 같은 서버 기술 또는 Backbone과 같은 클라이언트 기술)로 빌드된 기존 페이지가 잇고 해당 페이지 일부에서 상호작용할 수 있는 React 컴포넌트를 렌더링하고 싶다고 가정
* React 컴포넌트를 통합하는 일반적인 방식
* 수년 동안 Meta에서 대부분의 React 사용을 이런 식으로 함
* 두 가지 단계로 수행함
  1. JSX 구문을 사용할 수 있게 자바스크립트 환경을 설정하고 import/export 구문을 통해 코드를 모듈로 분리한 다음 npm 패키지 레지스트리의 패키지(예시: React)를 사용
  2. 해당 페이지에서 원하는 위치에 React 컴포넌트를 렌더링
    
**1단계: 모듈 자바스크립트 환경 설정하기**
* 모듈 자바스크립트 환경은 모든 코드를 한 파일에 작성하는 것이 아닌, 각각의 React 컴포넌트를 개별 파일로 작성할 수 있게 함
* 또한 (React 자체를 포함한) 다른 개발자들이 npm 레지스트리에 배포한 훌륭한 패키지들을 모두 사용할 수 있음
* 이 작업을 수행하는 방법은 기존 설정에 따라 다름
  1. 이미 애플리케이션이 import 문을 이용해 파일로 분리하고 있다면 기존에 가지고 있는 설정을 이용
    * JS 코드에서 `<div />`를 작성하면 문법 오류가 발생하는지 확인
    * 문법 오류가 발생한다면 Babel을 이용한 자바스크립트 코드 변환이 필요할 수 있으며 JSX를 사용하려면 Babel React 프리셋을 활성화해야 할 수도 있음
  2. 애플리케이션이 자바스크립트 모듈을 컴파일하기 위한 기존 설정이 없다면 Vite를 이용하여 설정
    * Vite 커뮤니티는 Rails, Django, Laravel을 포함한 다양한 백엔드 프레임워크와 통합을 지원
    * 사용 중인 백엔드 프레임워크가 목록에 없다면 가이드를 참고하여 Vite 빌드를 백엔드와 수동으로 통합 
    * 설정이 제대로 동작하는지 확인하려면 프로젝트 폴더에서 아래 명령어를 실행
    ~~~ 
      npm install react react-dom
    ~~~
    * 그리고 메인 자바스크립트 파일의 최상단에 다음 코드 라인을 추가 index.js 혹은 main.js라는 파일일 수 있음
    ~~~js
      import {createRoot} from "react-dom/client";

      //기존 HTML 콘텐츠를 지움
      document.body.innerHTML = '<div id="app"></div>';
    ~~~
    * 페이지의 전체 내용이 "Hello, world!"로 바뀌었다면 정상적으로 동작하고 있다는 것

## 2025.05.22 12주차
**새로운 React 앱 만들기**
* React로 새로운 앱이나 웹사이트를 구축하려면 프레임워크부터 시작하는 것이 좋음
* 앱에 기존 프레임워크에서 잘 제공되지 않은 제약 조건이 있거나 자체 프레임워크를 빌드하는 것을 선호하거나 React 기본 사항만 배우려는 경우 React 앱을 처음부터 빌드할 수 있음
* 풀스택 프레임 워크
  * 권장 프레임 워크는 프로덕션에서 앱을 배포하고 확장하는데 필요한 모든 기능을 지원
  * 최신 React 기능을 통합하고 React의 아키텍처를 활용

**Next.js(앱 라우터)**
* Next.js의 앱 라우터는 React의 아키텍처를 최대한 활용하며 풀 스택 React 앱을 활성화하는 React 프레임워크
* Next.js는 `Vercel`에서 유지 관리
* Next.js 앱을 빌드해서 Node.js와 서버리스 호스팅 혹은 자체 서버에서 배포할 수 있음
* Next.js는 또한 서버가 필요 없는 정적 내보내기도 지원
* Vercel은 추가적으로 옵트-인 유료 클라우스 서비스도 지원

**React Router (v7)**
* React Router는 React에서 가장 인기있는 라우팅 라이브러리, Vite와 함께 사용하면 풀스택 React 프레임워크를 만들 수 있음
* 표준 Web API이며 다양한 자바스크립트 런타임과 플랫폼을 위한 준비된 배포 탬플릿이 있다고 강조
* React Router는 Shopify에서 유지 관리

**Expo (네이티브 앱용)**
* Expo는 네이티브 UI를 사용하며 안드로이드, iOS, 웹을 위한 범용 앱을 만들 수 있는 React 프레임워크 
* 네이티브 부분은 쉽게 사용할 수 있게 해주는 React Native SDK를 제공
* Expo는 Expo(the company)에서 유지 관리
* Expo로 앱을 빌드하는 것은 무료이고 구글이나 애플 스토어에 제한 없이 제출할 수 있음

**TanStack Start(Beta)**
* TanStack Start는 TanStack Router를 기반으로 하는 풀스택 React 프레임워크. Nitro나 vite와 같이 전체 문서 SSR, 스트리밍, 서버 함수, 번들링과 많은 유용한 도구를 제공

**RedWoodJS**
* ReadWood는 쉽게 풀스택 웹 애플리케이션을 만들 수 있도록 사전탑재된 패키지와 구성을 가진 풀스택 React 프레임워크

**처음부터 시작하기**
1. 앱에 기존 프레임워크가 잘 지원하지 않는 제약 조건이 있거나
2. 자체 프레임워크를 구축하는 것을 선호하거나
3. React 앱의 기본을 배우고 싶은 경우


**1단계: 빌드 도구 설치**
* 첫 번째 단계는 `Vite`, `Parcel`, `Rsbuild`와 같은 빌드 도구를 설치하는 것
* 빌드 도구는 다음과 같은 기능을 갖고 있음
  1. 소스 코드를 패키징하고, 실행하는 기능
  2. 로컬 개발을 위한 개발 서버
  3. 앱을 프로덕션 서버에 배포하는 빌드 명령을 제공

**Vite**
* Vite는 현대 웹 프로젝트에 더 빠르고 가벼운 개발 환경을 제공하는 것을 목표로 하는 빌드 도구
* Vite는 독창적이며 기본적으로 합리적인 기본 기능을 제공
* Vite는 빠른 새로고침, JSX, Babel/SWC 및 기타 일반적인 기능을 지원하는 풍부한 플러그인 생태계를 갖추고 있음
* Vite를 시작하려면 React 플러그인 또는 React SWC 플러그인 과 React SSR 예제 프로젝트를 참조
* Vite는 이미 우리가 추천하는 프레임워크 중 하나에서 빌드 도구로 사용하고 있음(React Router, Next.js 등) 

**Parcel**
* Parcel은 뛰어난 기본 개발 경험과 확장 가능한 아키텍처를 결합하여 프로젝트를 시작 단계에서 대규모 프로덕션 애플리케이션으로 발전시킬 수 있음
* Parcel은 빠른 새로고침, JSX, TypeScript, Flow 및 스타일링을 기본적으로 지원

**Rsbuild**
* Rsbuild는 React 애플리케이션 개발에 원활한 환경을 제공하는 Rspack 기반 빌드 도구
* 세심하게 조정된 기본 설정과 성능 최적화 기능을 바로 사용할 수 있도록 제공
* Rsbuild는 빠른 새로고침과 JSX, TypeScript, 스타일링 등 React 기능을 기본적으로 지원

**React Native용 Metro**
* React Native를 처음부터 사용하려면 React Native용 JavaScript 번들러인 Metro를 사용해야 함
* 프로젝트에 React Native 지원이 필요하지 않다면 Vite, Parcel 또는 Rsbuild로 시작하는 것이 좋음

**2단계: 공통 애플리케이션 패턴 구축**
* 위에 나열된 빌드 도구는 클라이언트 전용 단일 페이지 앱(SPA)으로 시작하지만 라우팅, 데이터 가져오기, 스타일링과 같은 일반적인 기능에 대한 추가 솔루션은 포함하지 않음
* React 생태계에는 이러한 문제를 해결하는 다양한 도구가 있음

**Routing**
* 라우팅은 사용자가 특정 URL을 방문할 때 표시할 콘텐츠나 페이지를 결정
* 앱의 여러 부분에 URL을 매핑하려면 라우터를 설정해야 함
* 또한 중첩된 경로, 경로 매개변수, 쿼리 매개변수도 처리해야 함
* 라우터는 코드 내에서 구성하거나 구성 요소 폴더 및 파일 구조에 따라 정의할 수 있음
* 라우터는 최신 애플리케이션의 핵심 부분이며 일반적으로
  * 데이터 패치 : 더 빠른 로딩을 위해 전체 페이지에 대한 데이터를 미리 패치하는 것 포함
  * 코드 분할 : 클라이언트 번들 크기를 최소화 하기 위한 것 
  * 페이지 렌더링 방식 : 각 페이지가 생성되는 방식을 결정하기 위한 것  
이 포함됨

* 다음을 사용하는 것을 추천
  * React Router
  * TanStack Router

**Data Fetching 데이터 미리 가져오기**
* 서버나 다른 데이터 소스에서 데이터를 미리 가져오는 것으로 대부분의 애플리케이션에서 핵심적인 부분
* 이를 제대로 수행하려면 로딩 상태, 오류 상태, 그리고 가져온 데이터를 캐싱 등 복잡한 기능이 포함
* 특별히 제작된 데이터 가져오기 라이브러리는 데이터를 가져오고 캐싱하는 어려운 작업을 대신 처리해 주므로 개발자는 앱에 필요한 데이터와 이를 표시하는 방법에 집중할 수 있음
* 이러한 라이브러리는 일반적으로 컴포넌트에서 직접 사용되지만 더 빠른 프리페칭과 더 나은 성능을 위해 라우팅 로더에 통합되거나 서버 렌더링에도 사용할 수 있음
* 컴포넌트에서 직접 데이터를 가져오면 네트워크 요청 폭주로 인해 로딩 시간이 느려질 수 있으므로 라우터 로더나 서버에서 데이터를 미리 가져오는 것이 좋음
  * 이렇게 하면 페이지가 표시될 때 페이지의 모든 데이터를 한 번에 가져올 수 있음
* 대부분의 백엔드나 REST 스타일 API에서 데이터를 가져오는 경우 다음을 사용하는 것이 좋음
  * React Query
  * SWR
  * RTK Query
* GraphQL API에서 데이터를 가져오는 경우 다음을 사용하는 것이 좋음
  * Apollo
  * Relay

**Code-splitting 코드 분할**
* 코드 분할은 앱을 필요에 따라 로드할 수 있는 작은 묶음으로 나누는 프로세스
* 앱의 코드 크기는 새로운 기능과 추가 종속성이 있을 때마다 증가
* 앱 전체의 코드를 전송해야 사용하기 때문에 앱 로드 속도가 느려질 수 있음
* 캐싱, 기능/종속성 축소, 일부 코드를 서버에서 실행되도록 이동하면 로드 속도 저하를 완하하는데 도움이 되지만 과도하게 사용하면 기능이 저하될 수 있는 불완전한 해결책
* 마찬가지로 프레임워크를 사용하는 앱이 의존하여 코드를 분할하는 경우 코드 분할이 전혀 발생하지 않았을 때보다 로딩 속도가 느려지는 상황이 발생할 수 있음
* 예를 들어, 차트를 지연 로딩하면 차트 렌더링에 필요한 코드 전송이 지연되어 차트 코드가 앱의 나머지 부분에서 분리
* `Parcel`은 `React.lazy` 를 사용하여 코드 분할을 지원
* 그러나 차트가 처음 렌더링된 후 데이터를 로드하면 두 번 대기하게 됨
  * 이는 워터폴(waterfall)현상

**애플리케이션 성능 개선**
* 선택한 빌드 도구가 단일 페이지 앱(SPA)만 지원하므로
  * 서버 사이드 렌더링(SSR) SSG와 유사하지만 매 요청 시 서버에서 정적 페이지 생성
  * 정적 사이트 생성(SSG) 빌드 시 한 번에 모든 정적 페이지 생성 
  * React 서버 컴포넌트(RSC) 서버에서 동작하는 컴포넌트로 DB 접근 등이 가능  
  이와 같은 다른 렌더링 패턴을 구현

1. 단일 페이지 앱(SPA)은 단일 HTML 페이지를 로드하고 사용자가 앱과 상호작용할 때 페이지를 동적으로 업데이트
  * SPA는 시작하기는 쉽지만 초기 로드 시간이 느릴 수 있음
  * SPA는 대부분의 빌드 도구에서 기본 아키텍처로 사용


## 2025.05.15 11주차
**Step.3 최소한의 데이터만 이용해서 완벽하게 UI State 표현하기**
* 지난주 부터 이어지는 내용 
1. 제품의 원본 목록은 `props`로 전달되었기 때문에 `state`가 아님
2. 사용자가 입력한 검색어는 시간이 지남에 따라 변하고 다른 요소로부터 계산될 수 없기 때문에 `state`로 볼 수 있음
3. 체크박스의 값은 시간에 따라 바뀌고 다른 요소로부터 계산될 수 없기 때문에 `state`로 볼 수 있음
4. 필터링된 제품 목록은 원본 제품 목록을 받아서 검색어와 체크박스의 값에 따라 계산할 수 있으므로 이는 `state`가 아님
* 따라서 검색어와 체크박스 값만이 `state`

**Step.4 State가 어디에 있어야 할 지 결정하기**
* 앱에서 최소로 필요한 `state` 결정 완료
* 다음으로는 어떤 컴포넌트가 이 `state`를 소유하고 변경할 책임 지게 할 지 정해야 함
* React는 항상 컴포넌트 계층구조를 따라 부모에서 자식으로 데이터를 전달하는 단방향 데이터 흐름을 사용하는 것을 기억
* 앱을 구현하면서 어떤 컴포넌트가 `state`를 가져야 하는 지 바로 명확하지 않을 수 있음
* 어떤 컴포넌트가 `state`를 가져야 하는지 결정할려면...
  * 애플리케이션의 각 `state`에 대해
    1. 해당 `state`를 기반으로 렌더링하는 모든 컴포넌트를 찾고
    2. 가장 가까운 공통되는 부모 컴포넌트를 찾고(계층에서 모두를 포괄하는 상위 컴포넌트)
    3. `state`가 어디에 위치 돼야 하는지 결정
* `state`가 어디에 위치 돼야 하는지 결정할려면...
  1. 대개, 공통 부모에 `state`를 그냥 두면 됨
  2. 혹은, 공통 부모 상위의 컴포넌트에 둬도 됨
  3. `state`를 소유할 적절한 컴포넌트를 찾지 못했다면, `state`를 소유하는 컴포넌트를 하나 만들어서 상위 계층에 추가
    * 이전 단계에서 이 애플리케이션의 두 가지 `state`인 "사용자의 검색어 입력과 체크박스의 값"을 발견
    * 이 예시에서 두 가지 `state`가 항상 함께 나타나기 때문에 같은 위치에 두는 것이 합리적  
1. `state`를 쓰는 컴포넌트를 찾기
  * `ProducTable`은 `state`에 기반한 상품 리스트를 필터링해야 함(검색어와 체크 박스의 값)
  * `SearchBar`는 `state`를 표시해 주어야 함(검색어와 체크 박스의 값)
2. 공통 부모를 찾기
  * 둘 모두가 공유하는 첫 번째 부모는 `FilterableProductTable`
3. 어디에 `state`가 존재해야 할지 정해보기
  * `FilterableProductTable`에 검색어와 체크 박스 값을 `state`로 두기  
* `state` 값은 `FilterableProductTable` 안에 존재
* `useState()` `Hook`을 이용해서 `state`를 컴포넌트에 추가
* `Hooks`는 React 기능에 "연결할 수(hook into)"있게 해주는 특별한 함수
**State 선언**
1. `FilterableProductTable`의 상단에 두 개의 `state`변수를 추가해서 초기값을 명확하게 보여주기
~~~js
//FilterableProductTable
  function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
~~~

2. 다음으로 `filterText`와 `inStockOnly`를 `ProductTable`와 `SearchBar`에게 `props`로 전달
~~~js
//FilterableProductTable
return (
    <div>
      <SearchBar 
        filterText={filterText}
        inStockOnly={inStockOnly}/>
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  )
~~~

3. `ProductTable`의 `props`를 추가 -> `products` `filterText` `inStockOnly`
~~~js
//ProductTable
function ProductTable({ products, filterText, inStockOnly }) {
~~~

4. `ProductTable`의 `forEach`문 수정
~~~js
//ProductTable
 products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
~~~

~~~js
//SearchBar
  function SearchBar({filterText, inStockOnly}) {
~~~
* 여기까지의 과정에서 다음과 같은 오류가 나옴
![alt text](image/image15.png)
* `SearchBar` `input`의 `value`값을 아직 안 넣었기에 오류가 나옴

**Step 5. 역 데이터 흐름 추가하기**
* 지금까지 계층 구조 아래로 흐르는 `props`와 `state`의 함수로써 앱을 만듬
* 이제 사용자 입력에 따라 `state`를 변경하려면 반대 방향의 데이터 흐름을 만들어야 함
* 이를 위해서는 계층 구조의 하단에 있는 컴포넌트에서 `FilterableProductTable`의 `state`를 업데이트할 수 있어야 함
* `filterText`라는 `state`가 변경되는 것이 아니기 때문에 `input`의 `value`는 변하지 않고 화면도 바뀌는 것이 없음
* 사용자가 `input`을 변경할때 마다 사용자의 입력을 반영할 수 있도록 `state`를 업데이트
* `state`는 `FilterableProductTable`이 가지고 있고 `state` 변경을 위해서는 `setFilterText`와 `setInStockOnly`를 호출을 하면 됨
* `SearchBar`가 `FilterableProductTable`의 `state`를 업데이트할 수 있도록 하려면 이 함수들을 `SearchBar`로 전달
~~~js
//FilterableProductTable
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
~~~

* `SearchBar`에서 `onChange`이벤트 핸들러를 추가하여 부모 `state`를 변경할 수 있도록 구현
~~~js
//FilterableProductTable
return (
    <div>
      <SearchBar 
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}/>
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  )
~~~

* 완성
~~~js
//App.js
//App.css 도 추가
import { useState } from 'react';
import './App.css';

export default function App() {
  return (
    <>
      <FilterableProductTable products={PRODUCTS} />
    </>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}/>
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  )
}

function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) {
  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..." onChange={(e) => onFilterTextChange(e.target.value)}/>
      <label>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)}/>
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colspan = "2">
          {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
  
const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

~~~

## 2025.05.08 10주차
**React로 사고하기**  
  
**Step.1 UI를 컴포넌트 계층으로 쪼개기**
* 먼저 모의 시안에 있는 모든 컴포넌트와 하위 컴포넌트 주변에 박스를 그리고 이름을 붙이면서 시작
* 어떤 배경을 가지고 있냐에 따라 디자인을 컴포넌트로 나누는 방법에 대한 관점이 달라질 수 있음
* `Programming` : 새로운 함수나 객체를 만드는 방식과 같은 방법으로 시작
  * 이 중 단일책임 원칙으로 반영하고자 한다면 컴포넌트는 이상적으로는 한 번에 한 가지 일만 해야 함.
  * 컴포넌트가 커진다면 작은 컴포넌트로 쪼개져야 함
* `CSS` : 클래스 선택자를 무엇으로 만들지 생각(실제 컴포넌트는 좀 더 세분화 되어 있음)
* `Design` : 디자인 계층을 어떤 식으로 구성할 지 생각

* JSON이 잘 구조화 되어 있다면 종종 이것이 UI의 컴포넌트 구조가 자연스럽게 데이터 모델에 대응된다는 것을 발견할 수 있음
* 이는 UI와 데이터 모델은 보통 같은 정보 아키텍처, 즉 같은 구조를 가지기 때문
* UI를 컴포넌트로 분리하고 각 컴포넌트가 데이터 모델에 매칭될 수 있도록 설계
* 아래의 5개 컴포넌트를 설계

1. `FilterableProductTable`(회색) : 예시 전체를 포괄
2. `Searcher`(파란색) : 사용자의 입력을 받음
3. `ProductTable`(라벤더색) : 데이터 리스트를 보여주고, 사용자의 입력을 기반으로 필터링
4. `ProductCategoryRow`(초록색) : 각 카테고리의 헤더를 보여줌
5. `ProductRow`(노란색) : 각각의 제품에 해당하는 행을 보여줌 

* ProductTable을 보면 `Name`과`Price` 레이블을 포함한 테이블 헤더 기능만을 가진 컴포넌트는 없음
* 독립된 컴포넌트를 따로 생성할 지 생성하지 않을지는 만드는 사람의 선택
* 예시에서는 `3.ProductTable`에 있는 단순한 헤더들이 `ProductTable`의 일부이기 때문에 위 레이블들을 컴포넌트로 만들지 않고 그냥 남겨둠
* 그러나 이 헤더가 복잡해지면 (정렬을 위한 기능을 추가하는 등) `ProductTableHeader` 컴포넌트를 만드는 것이 더 합리적일 것
* 모의 시안 내의 컴포넌트들을 확인했으니 계층 구조로 정리
* 모의 시안에서 한 컴포넌트 내에 있는 다른 컴포넌트는 계층 구조에서 자식으로 표현

**Step 2. React로 정적인 버전 구현**
* 컴포넌트 계층 구조가 만들어졌으니, 앱을 실제로 구현해 볼 시간
* 가장 쉬운 접근 방법은 상호작용 기능은 아직 추가하지 않고, 데이터 모델로부터 UI를 렌더링하는 버전을 만드는 것
* 대체로 먼저 정적인 버전을 만들고 상호작용 기능을 추가하는 것이 더 쉬움
* 정적 버전을 만드는 것은 많은 타이핑이 필요하지만 생각할 것은 적음
* 반대로 상호작용 기능을 추가하는 것은 많은 생각이 필요하지만 타이핑은 그리 많이 필요하지 않음
* 데이터 모델을 렌더링하는 앱의 정적인 버전을 만들기 위해서는
  * 다른 컴포넌트를 재사용하고
  * `props`를 이용하여 데이터를 넘겨주는 컴포넌트를 구현하는 것이 좋음
* `props`는 부모가 자식에게 데이터를 넘겨줄 때 사용할 수 있는 방법
* `state`개념에 익숙하다고 해도 정적인 버전을 만드는 데는 `state` 사용 X
* `state`는 오직 상호작용을 위해, 시간이 지남에 따라 데이터가 바뀌는 것에 사용
* 지금 당장은 정적인 버전을 만들고 있기 때문에 지금은 필요하지 않음
* 앱을 만들 때 계층 구조에 따라 상층부에 있는 컴포넌트, `1.FilterableProductTable`부터 시작하는 `하향식(top-down)`으로 만드는 방법이 있음
* 또는 하층부에 있는  컴포넌트인 `5.ProductRow`부터 `상향식(bottom-up)`으로 만들 수 있음
* 간단한 예시에서는 보통 하향식으로 만드는게 더 쉽지만 프로젝트가 커지면 상향식으로 만들고 테스트를 작성하면서 개발하기가 더 쉬움
* 여기까지의 단계가 끝나면 데이터 렌더링을 위해 만들어진 재사용 가능한 `component`들의 라이브러리를 가지게 됨
* 현재는 앱의 정적 버전이기 때문에 component는 단순히 JSX만 리턴
* 계층구조의 최상의 `component(FilterableProductTable)`는 `prop`으로 데이터 모델을 받음
* 이는 데이터가 최상의 component부터 트리의 맨 아래까지 흘러가기 때문에 단방향 데이터 흐름 이라고 부름

**Step2에 있는 component 구현**
1. `Project`를 새로 생성하거나 초기 commit으로 switch하여 실행에 이상이 없는지 확인
2. src/ 아래 필요 없는 파일을 제거 (logo.svg / setupTest.js)
3. `App.js`에 있는 코드를 모두 삭제
4. 먼저 다음 코드로 `App.js`가 정상적으로 동작하는지 확인
5. 사용할 데이터 `PRODUCTS`를 적당한 위치에 작성

**Step 3: 최소한의 데이터만 이용해서 완벽하게 UI State 표현**
* `UI`를 `상호작용(interactive)`하게 만들려면 사용자가 기반 데이터 모델을 변경할 수 있게 해야 함.
* React는 state를 통해 기반 데이터 모델을 변경할 수 있게 함
* state는 앱이 기억해야 하는, 변경할 수 있는 데이터의 최소 집합이라고 생각
* state를 구조화 하는데 가장 중요한 원칙은 중복배제원칙
* 애플리케이션이 필요로 하는 가장 최소한의 state를 파악하고 나머지 모든 것들은 필요에 따라 실시간으로 계산 
* 예를 들어 쇼핑 리스트를 만든다고 하면 배열에 상품 아이템을 넣게 될 것
* UI에 상품 아이템의 개수를 노출하고 싶다면 상품 아이템 개수를 따로 state 값으로 가지는 게 아니라 단순하게 배열의 길이를 쓰면 됨
* 예시 애플리케이션 내 데이터들을 생각해보면 다음과 같은 데이터를 가지고 있음
  1. 제품의 원본 목록
  2. 사용자가 입력한 검색어
  3. 체크박스의 값
  4. 필터링된 제품 목록
* 이 중 어떤 것이 state가 되어야 할까? 세 가지 질문을 통해 결정해보자
  1. `시간이 지나도 변하지 않는가?` state가 아님
  2. `부모로부터 props를 통해 전달되는가?` state가 아님
  3. `컴포넌트 안의 다른 state나 props를 가지고 계산 가능한가?` state가 아님
* 이 외의 남는 것이 `state`가 될 것

**여기까지의 과정**
~~~js
// App.js

export default function App() {
  return (
    <>
      <FilterableProductTable products={PRODUCTS} />
    </>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  )
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..."/>
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colspan = "2">
          {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
  
const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

~~~

## 2025.04.18 보강
**한번 더 state 끌어올리기**
* `Game` 컴포넌트 안에 `state` 추가
~~~js
//Game.js
export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
 //...
}
~~~

* 현재 플레이 대한 `square`을 렌더링하려면 `history`에서 마지막 `squares`의 배열을 읽어야 함
* 계산할 수 있는 충분한 정보가 있기 때문에 `usestate`는 필요하지 않음
~~~js
//Game.js
export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const currentSquares = history[history.length - 1];
// ...
}
~~~
* `Game` 컴포넌트 안의 `Board` 컴포넌트가 게임을 업데이트할 때 호출할 `handlePlay` 함수 생성
* `xIsNext`, `currentSquares`, `handlePlay` 를 `Board` 컴포넌트에 `props`로 전달 
~~~js
//Game.js
export default function Game() {
  ...

  function handlePlay(nextSquares) {
    // TODO
  }

  return (
    <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}
//...
  )
~~~

* `Board` 컴포넌트가 `xIsNext`, `squares`, `onPlay` 함수를 `props`로 받을 수 있도록 변경
* `Board`함수에서 `useState`호출하는 처음 두 줄 제거
~~~js
//Game.js
function Board({ xIsNext, squares, onPlay }) {  
    function handleClick(i) {
//...
    }
    //...
}
~~~

* `Board` 컴포넌트의 `handleClick`에 있는 `setSquares` 및 `setIsNext` 호출을 새로운 `onPlay`함수에 대한 단일 호출로 대체
~~~js
//Game.js
if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
       onPlay(nextSquares)
    }
~~~

* `Game`컴포넌트에서 `handlePlay`함수 구현
* `setSquares`함수 대신 `history` `state` 변수 사용
* `squares` 배열을 새 `history`항목으로 추가하여 `history`업데이트 및
`xIsNext` 값 반전
~~~js
//Game.js
function handlePlay(nextSquares) {
      setHistory([...history, nextSquares]);
      setXIsNext(!xIsNext);
    }
 //...
~~~

* `[...history, nextSquares]`는 `history`에 있는 모든 항목을 포함하는 새 배열을 만들고 그 뒤에 `nextSquares` 생성
* `...history` 전개 구문을 사용하면 `"history 의 모든 항목 열거"`로 읽을 수 있음

**과거 움직임 보여주기**
* `<button>` 같은 React 엘리먼트는 일반 JavaScript 객체이므로 애플리케이션에서 전달 가능
* React에서 여러 엘리먼트를 렌더링하려면 React 엘리먼트 배열 사용
* 이미 state에 이동 history 배열이 있기 때문에 이것을 React 엘리먼트 배열로 변환
* JavaScirpt에서 한 배열을 다른 배열로 변환하려면 배열 map 메서드 사용
~~~js
[1, 2, 3].map((x) => x * 2) // [2, 4, 6]
~~~

* `Game` 컴포넌트에서 `history`를 `map`
* 각 플레이에 대한 버튼 `<button>`이 포함된 목록 `<li>`를 생성
* 버튼에는 아직 구현하지 않은 `jumpTo`라는 함수를 호출하는 `onClick`핸들러가 있음
~~~js
//Game.js
function jumpTo(nextMove) {
    // TODO
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
~~~
* 실행을 하면 다음과 같은 오류 메시지가 나옴
![alt text](image/image14.png)
* 배열 또는 반복자의 각 자식 요소는 고유한 `"key"`속성을 가져야 한다.

**map 함수의 활용**
~~~js
const moves = history.map((squares.move)) => { }
~~~
* `map`의 기본 구문은 `map(callbackFn)` 혹은 `map(callbackFn, thisArg)`
* `thisArg`는 내부에서 `this`로 사용할 값을 지정하는데 화살표 함수에서는 생략
* 예제에서는 `callbackFn`만 사용, 화살표 함수가 `callback 함수를 대신함
* squares, move는 화살표 함수의 매개변수
1. `history.map`: `history`는 모든 플레이를 저장하는 배열 이 `history`에 `map`함수를 적용한다는 의미
2. `map`함수는 `history`각각의 요소 `index`를 순회하면서 `squares` 추출
3. 각 요소는 `{ }`안의 실행문을 실행하면서 버튼을 생성
4. 이렇게 생성된 버튼은 `moves`객체(배열)에 다시 저장
5. `move` 최종 렌더링에 사용

**key 선택하기**
* 리스트를 렌더링할 때 React는 렌더링 된 각 리스트 항목에 대한 몇 가지 정보를 저장
* 리스트를 업데이트할 때 React는 무엇이 변경되었는지 확인
* 리스트의 항목은 추가, 제거, 재정렬 또는 업데이트될 수 있음
* React는 컴퓨터 프로그램이기에 사용자의 의도한 바를 알 수 없음
  * 그러므로 리스트의 항목에 `key`프로퍼티를 저장하여 각 리스트의 항목이 다른 항목과 다르다는 것을 구별해야 함
* 만약 데이터베이스에서 데이터를 불러와 사용한다면 데이터베이스 ID를 `key`로 사용할 수 있음
* 리스트가 다시 렌더링 되면 React는 각 리스트의 항목의 `key`를 가져와서 이전 리스트의 항목에서 일치하는 `key`를 탐색
* 현재 리스트에서 이전에 존재하지 않았던 `key`가 있으면 React는 컴포넌트를 생성
* 만약 현재 리스트에 이전 리스트에 존재했던 `key`를 가지고 있지 않다면 React는 그 `key`를 가진 컴포넌트를 제거
* 두 `key`가 일치한다면 해당 컴포넌트를 이동
* `key`는 각 React가 각 컴포넌트를 구별할 수 있도록 하여, 컴포넌트가 다시 렌더링 될 때 React가 해당 컴포넌트의 `state`를 유지할 수 있게 함
* 컴포넌트의 `key`가 변하면 컴포넌트는 제거되고 새로운 `state`와 함께 다시 생성됨
* `key`는 React에서 특별하게 미리 지정된 프로퍼티
* 엘리먼트가 생성되면 React는 `key`프로퍼티를 추출, 반환되는 엘리먼트에 직접 `key`를 저장
* `key`가 `props`로 전달되는 것처럼 보일 수 있지만, React는 자동으로 `key`를 사용해 업데이트할 컴포넌트를 결정
* 부모가 지정한 `key`가 무엇인지 컴포넌트는 알 수 없음
* 동적인 리스트를 만들 때마다 적절한 `key`를 할당하는 것을 강력하게 추천
* 적절한 `key`가 없는 경우 데이터의 재구성을 고려
* `key`가 지정되지 않은 경우, React는 경고를 표시하며 배열의 인덱스를 기본 `key`로 사용
* 배열 인덱스를 `key`사용하면 리스트 항목의 순서를 바꾸거나 항목을 추가/제거할 때 문제가 발생
* 명시적으로 `key={i}`를 전달하면 경고는 사라지지만 배열의 인덱스를 사용할 때 와 같은 문제가 발생하므로 추천X
* `key`는 전역적으로 고유할 필요 없으며 컴포넌트와 해당 컴포넌트의 형제 컴포넌트 사이에서만 고유하면 됨

**시간여행 구현**
* 틱택토 게임의 기록에서 과거의 각 플레이에는 해당 플레이의 일련번호인 고유 ID가 있음
* 플레이는 중간에 순서를 바꾸거나 삭제하거나 삽입할 수 없기 때문에 플레이 인덱스를 `key`로 사용하는 것이 안전
* `Game`함수에서 `<li key={move}>`로 `key`를 추가할 수 있으며, 렌더링 된 게임을 다시 로드하면 React의 `"key"`에러가 사라질 것
~~~js
//Game.js
const moves = history.map((squares, move) => {
  //...
  return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
  );
});
~~~
* `jumpTo`를 구현하기 전에 사용자가 현재 어떤 단계를 보고 있는지를 추적할 수 있는 `Game` 컴포넌트의 `state`가 하나 더 필요
* 초기값이 0인 `currentMove`라는 새 `state` 변수를 정의
~~~js
//Game.js
const [currentMove, setCurrentMove] = useState(0);
~~~
* `Game` 내부의 `jumpTo` 함수를 수정해서 해당 `currentMove`를 업데이트
* 또한 `currentMove`를 변경하는 숫자가 짝수면 `xIsNext`를 `true`로 설정
~~~js
//Game.js
function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }
~~~
* `Game`의 `handlePlay`함수 내용 중 두 가지를 변경
* 특정 시점에서 새로운 플레이를 하는 경우 해당 시점까지의 히스토리만 유지
  * `history`의 모든 항목(...전개 구문) 뒤에 `nextSquares`를 추가하는 대신
  `history.slice(0, currentMove + 1)`의 모든 항목 뒤에 추가하여 이전 히스토리의 해당 부분만 유지
* 이동할 때마다 최신 히스토리 항목을 가리키도록 `currentMove`를 업데이트
~~~js
function handlePlay(nextSquares) {
  const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);
  setXIsNext(!xIsNext);
}
~~~
* 항상 마지막 동작을 렌더링 하는 대신 현재 선택한 동작을 렌더링하도록 `Game`컴포넌트를 수정  
`[history.length - 1] -> [currentMove]`
* 게임 히스토리의 특정 단계를 클릭하면 틱택토 보드가 즉시 업데이트되어 해당 단계가 발생한 시점의 보드 모양이 표시

**최종 정리**
* `currentMove`가 짝수일 때는 `xIsNext === true`가 되고, 홀수일 때는 `xIsNext === false`가 됨
  * `currentMove`의 값을 알고 있다면 언제나 `xIsNext`가 무엇인지 알 수 있음
  * 두 가지 `state`를 저장할 필요가 없음
    * 중복되는 `state`는 피하는 것이 좋음
    * `state`에 저장하는 것을 단순화하면 버그를 줄이고 코드를 더 쉽게 이해할 수 있음

## 2025.04.17 7주차
**state 끌어올리기**
* `handleClick` 함수는 `JavaScript`의 `slice()` 배열 메서드를 사용하여 `squares` 배열의 사본인 `nextSquares`를 생성
* 그 다음 `handleClick` 함수는 `nextSquares` 배열의 첫 번째 `Squares(index [0])`에 `X`를 추가하여 업데이트
* `handleClick` 함수에 업데이트할 `Square`의 index를 나타내는 인수 i를 추가
* `Square`의 `onSquareClick prop`를 JSX에서 직접 `handleCLick(0)`으로 설정할 수 도 있지만 작동하지 않음
  * `handleClick(0)` 호출은 `Board` 컴포넌트 렌더링의 일부가 됨
  * `handleClick(0)`은 `setSquares`를 호출하여, `Board` 컴포넌트의 `state`를 변경하기 때문에 `Board` 컴포넌트 전체가 다시 렌더링
  * 이 과정에서 `handleClick(0)` 다시 실행되기 때문에 무한 루프에 빠지게 됨
* 9개의 서로 다른 함수를 정의하기에는 복잡함
  * 이 대신 `() => handleClick(0)` 화살표 함수 사용.
  ~~~js
  //board.js
    import { useState } from "react";
    import Square from "./Square";

    export default function Board() {
        const [squares, setSquares] = useState([Array(9).fill(null)]);
        function handleClick(i) {
            const nextSquares = squares.slice();
            nextSquares[i] = "X";
            setSquares(nextSquares);
    }
    return (
    //...
    )
  }
  ~~~

* 여기 까지의 과정에서 왼쪽 위 사각형을 클릭하여 `X`를 추가하면
  1. `button`이 Square로 부터 `onClick prop`으로 받은 함수 실행
      * `Square` 컴포넌트는 `Board`에서 해당 함수를 `onSquareClick props`로 받음
      * `Board` 컴포넌트는 `JSX`에서 해당 함수를 직접 정의
      * 이 함수는 0을 인수로 `handleClick`을 호출
  2. `handleClick`은 인수 0 을 사용하여 `squares` 배열의 첫 번째 엘리먼트를 `null`에서 `X`로 업데이트
  3. `Board` 컴포넌트의 `square state`가 업데이트되어 `Board`의 그 모든 자식이 다시 렌더링
      * 인덱스가 0인 `Square` 컴포넌트의 `value prop`이 `null`에서 `X`로 변경  
  4. 최종적으로 사용자는 왼쪽 위 사각형을 클릭한 후 비어있는 사각형이 `X`로 변경된 것을 확인

**`DOM <button>` 엘리먼트의 onClick 어트리뷰트(속성)는 빌트인 컴포넌트이기 때문에 React에서 특별한 의미**
* 사용자 정의 컴포넌트, 예를 들어 사각형의 경우 이름은 사용자가 원하는 대로 지을 수 있음

**불변성의 중요성**
* 일반적으로 데이터를 변경하는 방법 두가지
  1. 데이터의 값을 직접 변경하여 데이터를 변형 
  2. 원하는 변경 사항이 있는 새 복사본으로 데이터를 대체

**원본 데이터를 직접 변형하지 않음으로써의 이점**
* 불변성을 사용하면 복잡한 기능을 훨씬 쉽게 구현
  * 과거 움직임으로 `돌아가기`를 할 수 있는 `시간 여행` 기능 구현 예정
* 기본적으로 부모 컴포넌트의 `state`가 변경되면 모든 자식 컴포넌트가 자동으로 다시 렌더링
  * 변경 사항이 없는 자식 컴포넌트도 포함
* 리렌더링 자체가 사용자에게 보이는 것은 아니지만, 성능상의 이유로 트리의 영향을 받지 않는 부분의 리렌더링을 피하는 것이 좋음
* 불변성을 사용하면 컴포넌트가 데이터의 변경 여부를 저렴한 비용으로 판단

**교대로 두기**
* 기본적으로 첫 번째 이동을 `“X”`로 설정
* 보드 컴포넌트에 또 다른 `state`를 추가

~~~js
//Board.js
export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState([Array(9).fill(null)]);
    function handleClick(i) {
        const nextSquares = squares.slice();
        if (xIsNext) {
          nextSquares[i] = "X";
        } else {
          nextSquares[i] = "O";
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }
    return (
    //...
  );
}
~~~

* 여기 까지의 과정에서는 O,X가 덮어씌워지는 상황이 생김
  * 사각형이 이미 채워져 있는 경우 보드의 `state`를 업데이트하기 전에 `handleClick` 함수에서 조기에 `return`

~~~js
//Board.js
function handleClick(i) {
  if (squares[i]) {
    return;
  }
  const nextSquares = squares.slice();
  //...
}
~~~

**승자 결정**
* `X` , `O`  또는 `null`을 반환하는 도우미 함수 `calculateWinner`를 추가
* 승리할 수 있는 경우의 자리를 2차원 배열로 선언
* 선언된 배열 `line`과 `squares`를 비교하기 위한 `for`문을 작성
* 비교를 위해 구조 분해 할당

**구조 분해 할당**
* `비구조화 할당`, `구조화 할당`이라고도 번역되지만 `구조 분해 할당`을 많이 사용
* `구조 분해 할당`은 배열이나 객체의 구조를 해체하여 내부 값을 개별 변수에 쉽게 할당하는 방법
* 이를 통해 코드이 간결성과 가독성 ↑
* `map` 함수에서도 많이 사용되는 방법

~~~js
//Board.js
export default function Board() {
  //...
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
  return null;
}
~~~
* lines는 승리할 수 있는 `squares`의 index 번호
* `for`문을 통해 `lines`의 길이 만큼 비교를 반복
* 구조 분해 할당을 통해 `lines`의 index를 `a,b,c`에 보관
* `squares`의 해당 index 값을 비교하여 3개가 모두 일치하면 값이 `X`인지 `O`인지 `return`
* 일치하는 것이 없으면 `null`을 `return`

**승자 결정**
* Board 컴포넌트의 `handleClick` 함수에서 `calculateWinner(squares)`를 호출하여 플레이어가 이겼는지 확인

~~~js
//Board.js
function handleClick(i) {
  if (squares[i] || calculateWinner(squares)) {
    return;
  }
  const nextSquares = squares.slice();
  //...
}
~~~
* 여기까지의 과정으로 승리 조건이 만족되면 더 이상 게임이 진행되지 않음

**승자 결정**
* 게임이 끝났을 때 플레이어에게 알리기 위해 `“Winner: X”` 또는 `“Winner: O”`라고 표시
* `Board` 컴포넌트에 `status` 구역을 추가
* 게임이 끝나면 `status`는 승자를 표시
* 게임이 진행중인 경우 다음 플레이어의 차례 표시

~~~js
//Board.js
export default function Board() {
  // ...
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        // ...
  )
}
~~~

**시간여행 추가**
* 시간을 거슬러 올라가는 기능
* `slice()`를 사용하여 매번 이동할 때마다 `squares` 배열의 새 복사본을 만들고 이를 불변으로 처리
* `squares` 배열의 모든 과거 버전을 저장할 수 있고 이미 발생한 턴 사이를 탐색
* `squares` 배열을 `history`라는 다른 배열에 저장하고 이 배열을 새로운 `state` 변수로 저장

**한번 더 state 끌어올리기**
* 최상위 컴포넌트 Game을 작성
* `history state`를 배치
* `history state`를 `Game` 컴포넌트에 배치하면 자식 `Board` 컴포넌트에서 `squares state`를 제거
* `Square` 컴포넌트에서 `Board` 컴포넌트로 `state`를 끌어올렸던 것처럼, 이제 `Board` 컴포넌트에서 최상위 `Game` 컴포넌트로 `state`를 끌어올릴 수 있다
* `Game` 컴포넌트가 `Board` 컴포넌트의 데이터를 완전히 제어하고 `Board`의 `history`에서 이전 순서를 렌더링하도록 지시

~~~js
//Board.js ---> Game.js 이름 변경
function Board() {
  // ...
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
~~~


## 2025.04.10 6주차
**props를 통해 데이터 전달**
* React의 component architecture를 사용해서 재사용할 수 있는 component를 만들어서 지저분하고 중복된 코드 삭제
  * Board component를 만들고 Square component의 내용 복사
  * Square comonent의 button을 하나만 남기고 모두 삭제
  * Board comopnent의 button을 Square component로 교체
  * App에서 호출하는 component를 Square에서 Board로 교체
  * Square component를 value prop을 전달 받을 수 있도록 수정
  ~~~js
    function Square({ value }) {
      return <button className="square">1</button>;
    }
  ~~~
  * JavaScript 변수가 렌더링 되기 위해 value에 중괄호 추가
  ~~~js
    function Square({ value }) {
      return <button className="square">{value}</button>;
    }
  ~~~

**사용자와 상호작용하는 컴포넌트**
  1. Square 내부에 handleClick 함수 선언
  2. Square 컴포넌트에서 반환되는 JSX 버튼의 props에 onClick을 추가
    * 사각형 클릭시 clicked 라는 로그 출력
    ![alt text](image/image11.png)

* 이번에는 사각형 컴포넌트가 클릭 된 것을 "기억"하고 "X" 표시로 채우기
  * 컴포넌트는 무언가 "기억"하기 위해 state를 사용
  * React는 상태 기억을 위해 useState라는 Hook을 제공
  * Square의 현재 값을 state에 저장하고 Square가 클릭하면 값이 변경

**useState 사용**
  1. 파일 상단에 useState를 import
  2. Square 컴포넌트에서 value prop을 제거, 대신 useState 사용
  3. Square 컴포넌트 시작 부분에 useState를 호출, value라는 이름의 state 변수를 반환  
      * value 값을 저장하는 변수, setValue는 값을 변경하는 데 사용하는 함수  
      * useState에 전달된 null은 이 state 변수의 초기값으로 현재 value는 null이라는 의미  
      * 앞에서 Square 컴포넌트는 더 이상 props를 사용하지 않게 수정
  4. Board 컴포넌트가 생성한 9개의 Square 컴포넌트에서도 value prop을 제거   
  5. console.log("clicked!"); -> 이벤트 핸들러를 ('X')로 변경  

     ![alt text](image/image12.png)
    ![alt text](image/image13.png)  
  
**state 끌어올리기**
* 여기까지의 과정에서 각 Square 컴포넌트는 게임 state의 일부를 기억
* 게임의 승자를 확인할려면 Board가 9개의 Square 컴포넌트 각각의 state를 기억해야 함
  * state를 각 square가 아닌 부모 컴포넌트인 Board에 저장하는 것
  * Board 컴포넌트는 각 Square에 숫자를 전달했을 때와 같이 prop를 전달하여 Square에 표시할 내용을 정할 수 있음
    * 부모 컴포넌트에서 공유 state를 선언
    * 부모 컴포넌트는 props를 통해 해당 state를 자식 컴포넌트에 전달
* Board 컴포넌트를 편집해서 9개 Square에 해당하는 9개의 null의 배열을 기본값으로 하는 state 변수를 square를 선언
* Array(9).fill(null)은 9개의 엘리먼트로 배열을 생성, 각 엘리먼트를 null로 설정
* state 변수 squares와 함수 setSquares 선언 
* 배열의 각 항목은 각 Square 컴포넌트의 값에 해당

**component 분리**
1. component 이름과 동일한 파일 만들기
2. 해당 파일에 코드를 복사하고 export default 키워드를 추가
3. 필요한 component와 useState를 추가
4. App.js에서 해당 코드를 삭제하고, Board component를 import
5. App.js에서 useState의 import를 제거
6. 정상적으로 동작하는지 확인

## 2025.04.03 5주차
**이벤트에 응답**
* component 내부에 event handler 함수를 선언하면 event에 응답할 수 있음
* onclick={handclick}의 끝에는 소괄호`()`가 없음
* 함수를 호출하지 않고 전달하면 끝
* React는 사용자가 버튼을 클릭할 때 이벤트 핸들러를 호출

**화면 업데이트**
* component가 특정 정보를 '기억'해 두었다가 표시하기를 원하는 경우가 있다
  * 예를 들면 버튼이 클릭 된 횟수
* 이렇게 하려면 component에 state를 추가
  * React에서 useState를 import
    * component 내부에 state 변수 선언 가능

**Hook**
* use로 시작하는 함수를 `Hook` 이라 한다.
* useState는 React에서 제공하는 내장 Hook
* 다른 내장 Hook은 API 참고서 에서
* 기존의 것들을 조합해 자신만의 Hook을 만들 수 있음

**Hook 사용 규칙**
* 최상위에서만 호출
* if, for, while등의 블록 내부에서 호출 불가능
  * 조건문 내부에서 호출 시 실행 순서가 달라질 수 있음
* React 함수형 component 또는 사용자 hook 내부에서만 사용 가능
* 일반적인 JavaScirpt 함수에서 useState, useEffect 등의 Hook 사용 불가능

**Hook 제한이 필요한 이유**
* React 동작을 예측 가능하고 안정성을 높이기 위해
  1. rendering 순서를 보장하기 위해
  2. 불필요한 사이드 이펙트 방지

**function형 컴포넌트에서만 Hook을 사용하는 이유**
* React는 component의 상태 관리(lifecycle)와 로직을 더 간결하기 위해 Hooks를 도입
  * 따라서 React는 function형 component를 권장

**5주차 실습**

~~~js
//CountState.js
import { useState } from "react";

export default function CountState() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <div>
            <button onClick={handleClick}>
                Clicked {count} times
            </button>
        </div>
    );
}
~~~
![alt text](image/image9.png)

~~~js
//CountState2.js
function CountState2({ count, onClick }) {

    return (
      <div>
          <button onClick={onClick}>
              Clicked {count} times
          </button>
      </div>
    );
}
~~~
![alt text](image/image10.png)

## 2025.03.27 4주차
**component의 생성 및 중첩**
* component는 고유한 로직과 모양을 가진 UI의 일부
* component는 버튼처럼 작거나 전체 페이지처럼 클 수도 있음
* component는 마크업을 반환(return)하는 JavaScript함수

**export default 키워드**
* 파일 내의 component중 기본 component를 지정
* 이 키워드의 사용도 JavaScript문법

**export default와 export의 차이**
* Named Exports(export)
  * 하나의 파일 안에 여러 개의 component가 있을 때 사용
  * component를 사용하는 쪽에서는 component의 정확한 이름을 명시해야 함
* Default Exports(export default)
  * 하나의 파일 안에 하나의 component만 내보내는 경우
  * component를 사용하는 쪽은 자유롭게 이름을 쓸 수 있음

**JSX로 마크업 작성**
* 작성된 코드의 문법은 JSX이다.
* 반드시 사용해야 하는 것은 아니지만 React 프로젝트에서는 편의성을 위해 사용한다.
* JSX는 HTML보다 더욱 엄격한 문법을 적용
* JSX에서는 `<br />` 같이 싱글 태그라도 태그를 닫아야 한다.
* 여러 개의 component를 `<div>...</div>` , `bean<>...</>` wrapping 해야 한다.

**스타일 추가**
* React에서는 className으로 CSS클래스 지정
* className은 HTML의 CSS속성과 동일한 방식으로 동작
* CSS 규칙은 별도의 CSS파일에 작성. React는 CSS파일을 추가하는 방법을 규정하지 않는다.

**데이터 표시**
* JSX를 사용하면 JavaScript에 마크업을 넣을 수 있다.
* JSX 코드 내에서 JavaScript로 탈출하여 변수나 표현식을 사용하는 것 
  * 이 방법은 "Escape Back"
* {} 중괄호를 사용해서 변수나 표현식을 사용자에게 표시하도록 하는 것

**조건부 렌더링**
* React에서 조건문을 작성하는 데에는 특별한 문법이 필요없음.
* 일반적인 JavaScript 코드를 작성할 때 사용하는 것과 동일한 방법을 사용
  * if-else 문
  * 삼항 연산자
  * 이항 연산자

**리스트 렌더링**
* 컴포넌트 리스트를 렌더링하기 위해서는 `for()문 및 map()함수`와 같은 JavaScript 기능을 사용
* <li>에 key 속성이 있다.
* 목록을 사용할 때 각 항목에 대해 고유하게 식별하는 문자열 또는 숫자를 전달해야 한다.
* 항목을 삽입, 삭제 또는 재정렬할 때 어떤 일이 일어났는지 알기 위해 key를 사용
  * 이 것을 `key props`라 한다.

**4주차 실습**
~~~js
//About.js
export default function AboutPage() {
    return (
        <>
            <h1>About Page</h1>
            <p>Hello!!!</p>
        </>
    )

}
~~~
![alt text](image/image4.png)

~~~js
//MyButton.js
export default function MyButton() {
    return (
      <button>I'm My button component</button>
    )
  }
  
~~~
![alt text](image/image5.png)

~~~js
//ButtonLib.js
function Button1() {
    return (
        <button>Button1</button>
    )
}

function Button2() {
    return (
        <button>Button2</button>
    )
}

function Button3() {
    return (
        <button>Button3</button>
    )
}

export {Button1, Button2, Button3}
~~~
![alt text](image/image6.png)

~~~js
//App.js
import MyB from "./MyButton"
import { Button1, Button3 } from "./ButtonLib"
import AP from "./AboutPage"
import Profile from "./Profile"
import './App.css'
import SL from "./ShoppingList"

export default function App() {
  return (
    <div className ='main'>
      <h1>Hello React</h1>
      <MyB /> <br />
      <Button1 />&nbsp;
      <Button3 />
      <AP />
      <Profile />
      <SL />
    </div>
  )
}
~~~
![alt text](image/image7.png)

**App.js 실행결과**
![alt text](image/image8.png)

## 2025.03.20 3주차

### React project의 구조 및 역할

**node modules**
* 초기 node module 및 새로 설치하는 패키지가 저장

**public**
* 정적(static)파일을 저장하는 디렉토리
* build 후 배포할 html, CSS, JavaScript등이 보관되는 곳

**public/index.html**

**src**
* React 프로젝트의 주요 코드가 위치하는 디렉토리

**src/App.js**
* 메인 component로 필요한 sub component를 모아서 관리

**src/app.js**
* App.js에 적용되는 스타일을 정의하는 스타일 파일

**src/index.js**
* React 앱의 진입 점(entry point)으로 최종 렌더링 되는 곳

**src/index.css**
* 전역 스타일을 정의하는 스타일 파일

**의존성 관리와 package.json**
* package.json은 패키지의 의존성을 관리하는 파일
* 의존성(Dependency) 이란, 하나의 소프트웨어가 다른 소프트웨어(라이브러리,패키지, 모듈 등)에 의존하여 동작하는 관계를 말한다.
* 프로젝트에 사용된 각종 패키지 등의 버전을 동일하게 유지하기 위한 것

**의존성을 관리하는 이유**
* 손쉬은 설치 및 업데이트
* 일관된 개발 환경 유지
* 중복 설치 방지

**package.json을 유지해야 하는 이유**
* 프로젝트 의존성 정보 제공
* 버전 범위 설정 가능
* 스크립트와 메타데이터 저장
* 새로운 패키치 설치 및 관리

**node module의 재설치**
* 프로젝트에 오류나 의존성 등의 문제가 생겼을 경우
    1. node_modules 폴더와 package-lock.json 파일을 삭제
    ~~~bash
    $ rm -rf node modules package-lock.json
    ~~~
    2. npn 패키지의 임시 저장소인 cache를 초기화
     ~~~bash
    $ npm cache clean --force //force 옵션을 사용
    ~~~
    3. 패키지를 다시 설치
     ~~~bash
    $ npm install
    ~~~

**package-lock.json을 삭제하는 이유**
* package-lock.json이 손상되었거나, 잘못된 의존성이 있을 때
* 최선 버전의 패키지를 다시 받고 싶을 때
* 팀 프로젝트에서 다른 팀원이 이상한 상태로 업데이트 했을 때

**React에서의 component**
* React는 component 단위로 개발하여 레고 조립하듯 앱을 완성
* component는 작은 기능을 실행할 수 있는 하나의 모듈

**component를 작성하는 JavaScript&Markup**  
* JavaScript
    * React component는 JavaScript함수
    * 조건을 사용할때는 if문
    * 목록 표시는 map()
    * JavaScript를 이미 이해하고 있다면 용이하다.
* MarkUp
    * React에서 사용되는 MarkUp을 JSX(JavaScript Syntax eXtension)이라 한다.
    * JSX는 React를 통해 대중화된 JavaScript 확장 문법
    * JSX MarkUp을 렌더링 로직과 가까이 두면 component 쉽게 생성, 관리, 삭제를 할 수 있다.  

**상호작용 기능 추가**  
* React component는 데이터 수신, 화면에 표시되는 내용 반환
* 사용자의 입력을 받아 새로운 데이터를 component에 전달 가능
* 이때 React는 상호작용을 통해 새 데이터를 화면에 업데이트
* 두 개의 component를 결합해 또 다른 component를 만들어낼 수 있다.

**상호작용 예시**
~~~js
import { useState } from 'react';

function SearchableVideoList({ videos }) {
  const [searchText, setSearchText] = useState('');
  const foundVideos = filterVideos(videos, searchText);
  return (
    <>
      <SearchInput
        value={searchText}
        onChange={newText => setSearchText(newText)} />
      <VideoList
        videos={foundVideos}
        emptyHeading={`No matches for “${searchText}”`} />
    </>
  );
}
// SearchInput과 VideoList가 결합해 또 다른 component를 만들었다.
~~~

**full-stack 개발을 돕는 React Framework**
* React는 라이브러리이기 때문에 component 조합할 수 있지만, 라우팅 및 데이터 가져오기 방법등을 규정하지 않는다.
* React 전체 앱을 빌드할려면 Next.js 또는 Remix와 같은 full-stack React Framework을 사용하는 것이 좋다.

**플랫폼을 가리지 않는 React**
* React를 사용하면 동일한 기술을 사용해 웹 앱과 네이티브 앱 모두 구축 가능
* 각 플랫폼의 강점을 활용하여 모든 플랫폼에 어울리는 인터페이스 구현 가능
* 크롬, 파이어폭스, 사파리 등 각기 다른 웹에서도 본질에 충실
* 안드로이드, IOS등 운영체제에 관계없이 진정한 네이티브 UX를 실현

## 2025.03.13 2주차

**Node.js?**
* 2009년 발표, 라이언 달(Ryan dahl)이 개발  
* Apache는 블로킹(Blocking) 방식으로 동작. 이를 대체하기 위한 목적
* 비동기 방식(Asynchronus)의 서버가 필요하다고 판단,개발
* 개발은 python에서 javascript로 전환
* 크롬 브라우저가 주목 받고 있었기에 V8 엔진 사용

**React?**
* javascript UI를 표방하며 2013년 공개
* 18.2.0버전까지 javascript 라이브러리임을 강조
* javascript 라이브러리에서 웹과 앱 UI의 표준 라이브러리로 변신해가는 중

**Node.js 설치**

![alt text](image/image1.png)

**프로젝트 만들기**

![alt text](image/image2.png)

**서버 시작**
* 서버 시작은 "npm start"
* 서버 중지는 서버가 시작된 상태에서 "ctrl + c"

![alt text](image/image3.png) 
