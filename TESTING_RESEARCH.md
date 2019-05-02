Andrew Douglass<br>
CIS 412<br>
18 April 2019<br>

The Importance, Best Practices, and Strategies of React Native Testing<br><br>

<b>Why is testing important?</b><br>

Before discussing the best practices of testing applications, we must understand why testing is important. CIS 411 covered the different types of testing and the different problems these tests solve. Unit tests check individual pieces of code, and integration tests check if all the individual pieces of code work integrated together. User acceptance tests (UAT) are important for ensuring that developers’ finished products meet their clients’ requirements.

There are many other types of tests that developers can create to ensure their product (1) is functional and (2) satisfies the need of its customers. For React Native specifically, apps need to be bug-free, simple, and inviting, so developers must test that this is the case. If people cannot understand or use an app effortlessly and quickly (without encountering bugs), many users will delete the app and not look back.

Matt Dupree, on his website Philosophical Hacker, gives two additional reasons why testing is important. First, if software developers anticipate that their application will grow in scale, then automated testing becomes crucial to ensuring scalability. Second, Matt highlights the connection between effective unit tests and software architecture: “For a class to be easy to unit-test, the class must…be loosely coupled and highly cohesive – in other words, well-designed.”

<br><b>Best testing practices in the industry</b><br>

Matt Dupree also shares some worthwhile advice on the best testing practices for React Native applications. He first warns about the overreliance some developers have on unit tests, and then cites Martin Fowler’s thoughts on high-level tests “as a second line of test defense.” Dupree gives a testing pyramid that reflects Fowler’s idea.<br><br>

<img src="https://cdn-images-1.medium.com/max/720/1*tiijQ7OKygfD40ksFXEGBg.png" width="50%" height="50%"/><br><br>

This pyramid represents a hierarchy of tests by their importance. While unit tests are the foundation of any functioning application, the entire service layer must be tested by integrating units together. Lastly, the UI must be tested, but the service layer must work without problems first. This dependency structure is vital for testing any application, and React Native is no different.
Dupree says that tests should be developed to be fast, reliable, and localize defects. If a test “localizes defects,” it provides helpful information on where the test fails. This ensures that developers do not have to search through thousands of lines of code to debug. But thorough tests also must be able to catch several errors, so balancing test efficiency and coverage often proves rather difficult.<br><br>

<b>Unit testing in React Native</b><br>

Testing React Native applications requires two different packages: Jest and Enzyme. While Jest is included in React Native’s packages, Enzyme must be installed separately. Both are designed to test React and React Native apps, but they are not identical. Jest is a JavaScript testing framework, while Enzyme is a JavaScript testing utility. Dominic Fraser summarizes the similarities and differences between Jest and Enzyme best:

<blockquote><b>Jest and Enzyme</b><br><br>
<li>Both Jest and Enzyme are specifically designed to test React applications, Jest can be used with any other Javascript app but Enzyme only works with React.</li>
<li>Jest can be used without Enzyme to render components and test with snapshots, Enzyme simply adds additional functionality.</li>
<li>Enzyme can be used without Jest, however Enzyme must be paired with another test runner if Jest is not used.</li><br>
As described, we will use:<br><br>
<li>Enzyme to provide additional testing utilities to interact with elements</li></blockquote>

Combining these two packages, we can write effective tests. For example, we could write snapshot tests in Jest to ensure that components are rendered correctly and that are no unexpected changes in our UI. Or, since “Enzyme allows for direct manipulation of the props and state of our components, we can create snapshots for multiple renders of the same component” (Gaare). Jest can also mock functions and modules. According to Shanaka Senevirathne, “the idea behind mocking is to replace something we don’t control with something we do.” Rather than duplicating code in a test file, we can “isolate test subjects by replacing dependencies with objects that you can control and inspect” (Hanlon II). Jest can mock either functions or modules.<br><br>

<b>Recommendations for ServeCentral</b><br>

If ServeCentral wants to write effective unit tests, I would suggest that we follow this list of DO's and DONT's:<br><br>

DO:
<li>Follow the red-green-refactor method of test-driven development (TDD).</li>
<li>Write unit tests in a three part structure: Arrange, Act, Assert (AAA). This makes tests easier to read and modify.</li>
<li>Mock functions and modules when possible to make isolating components easier</li><br>
DON'T:<br><br>
<li>Use Jest without Enzyme. Without Enzyme, Jest cannot do nearly as much.</li>
<li>Write unit tests that involve than one component.</li>
<li>Write UI tests before unit tests. Refer to the pyramid hierarchy of tests.</li><br>

Furthermore, every screen should have at least one unit test for each of its components. After that is finished, it makes sense to create snapshot tests to see if all of the components render correctly together. Beyond this, my recommendations are mostly based on the industry’s best practices, especially TDD and AAA. The other recommendations are simply the highlights of my research, or the “tl;dr version,” as one of my sources calls it. I hope that this research document is a helpful resource for ServeCentral or any other React Native team to use when testing their applications.<br><br>

<b>References / Annotated Bibliography</b><br><br>
Official documentation for Jest and Enzyme:<br>
[https://airbnb.io/enzyme/docs/guides/react-native.html](https://airbnb.io/enzyme/docs/guides/react-native.html)<br>
[https://jestjs.io/docs/en/tutorial-react-native](https://jestjs.io/docs/en/tutorial-react-native)<br><br>

Miscellaneous testing articles:<br>
[https://www.codecademy.com/articles/tdd-red-green-refactor](https://www.codecademy.com/articles/tdd-red-green-refactor)<br>
[https://www.softwaretestinghelp.com/types-of-software-testing/](https://www.softwaretestinghelp.com/types-of-software-testing/)<br><br>

Dupree: This source details some of the best practices for application testing. It also discusses why testing is important for any application. I do not believe the actual code given is relevant to ServeCentral.<br>
[https://www.philosophicalhacker.com/post/patterns-principles-and-tools-for-testing-react-native-apps/](https://www.philosophicalhacker.com/post/patterns-principles-and-tools-for-testing-react-native-apps/)<br><br>

Fraser: This source concisely compares Jest and Enzyme. CAUTION: This article discusses how to test a React app, not a React Native app. So only the first half of this article is useful to ServeCentral, since we use React Native.<br>
[https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675](https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675)<br><br>

Gaare: This 4-part tutorial series is far more thorough than Senevirathne’s article, but Senevirathne’s article serves as a better introduction for those unfamiliar. This is also from June 2017, while Senevirathne’s article is from December 2018.<br>
[https://medium.com/react-native-training/learning-to-test-react-native-with-jest-part-1-f782c4e30101](https://medium.com/react-native-training/learning-to-test-react-native-with-jest-part-1-f782c4e30101)<br><br>

Hanlon II: This tutorial explains Jest mocks in a way that makes sense. No other tutorial listed here explains mocking well. Not even Jest’s official documentation explains it very well.<br>
[https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c](https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c)<br><br>

Senevirathne: This article was the best introductory tutorial I found on unit testing with both Jest and Enzyme. Gaare’s tutorial goes more in depth and has 4 parts. I also learned the AAA pattern for unit test structure (Arrange, Act, Assert).<br>
[https://medium.com/@hdsenevi/unit-testing-in-react-native-with-jest-and-enzyme-40cd7dabb6f1](https://medium.com/@hdsenevi/unit-testing-in-react-native-with-jest-and-enzyme-40cd7dabb6f1)
