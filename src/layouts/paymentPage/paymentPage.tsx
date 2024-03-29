import React from "react";
import "../../styles/paymentPage.scss";

const PaymentPage = () => {
    return (
        <div className="payment">
            <h1 className="payment__title">Способы оплаты</h1>
            <section className="payment__section">
                <p>1. Наличными деньгами при получении товара дома, в офисе или в точках выдачи.</p>
                <p>2. Онлайн оплата банковской картой на сайте. Мы принимаем онлайн-платежи по банковским картам VISA / Master Card.</p>
                <p>Оплатить покупку банковской картой вы можете при оформлении заказа в "Корзине". Подробнее</p>
                <p>3. Банковской картой Visa/MasterCard. Оплатить покупку пластиковой картой можно при доставке товара и во всех точках выдачи товаров.</p>
                <p>4. Подарочной картой. Подарочные карты принимаются к оплате только в фирменных розничных салонах. Подарочной картой можно оплатить 100% стоимости покупки, если суммы подарочной карты достаточно для оплаты. Если сумма подарочной карты меньше стоимости товара, недостающую сумму можно оплатить как наличными, так и по банковской карте. Будьте внимательны: картой можно воспользоваться только 1 раз,  если сумма подарочной карты больше стоимости товара, то остаток на карте сгорает!</p>
                <p>Приобрести подарочную карту можно в точках выдачи. Подарочная карта является безноминальной, то есть сумма подарочной карты равна той сумме, которую Вы внесли на карту при покупке.</p>
                <p>5. В кредит. Вы можете приобрести товар в кредит онлайн на сайте - необходимо лишь оформить заказ и в разделе "Способ оплаты" указать "Кредит", после нажатия кнопки "Купить" с вам свяжется оператор и оформит ваш заказ. С Вами также может связаться представитель банка-партнера (зависит от того, какой банк и кредитную программу Вы выбрали). Более подробно о кредитных программах Вы можете уточнить в разделе Кредит.</p>
                <p>6. Оплата на сайте. Оплатить заказ можно с помощью банковских карт платёжных систем Visa, MasterCard, МИР. При оплате банковской картой безопасность платежей гарантирует процессинговый центр Best2Pay.</p>
                <p>Приём платежей происходит через защищённое безопасное соединение, используя протокол TLS 1.2. Компания Best2Pay соответствует международным требованиями PCI DSS для обеспечения безопасной обработки реквизитов банковской карты плательщика. Ваши конфиденциальные данные, необходимые для оплаты (реквизиты карты, регистрационные данные и др.) не поступают в Интернет-магазин, их обработка производится на стороне процессингового центра Best2Pay и полностью защищена. Никто, в том числе интернет-магазин не может получить банковские и персональные данные плательщика.</p>
                <p>При оплате заказа банковской картой возврат денежных средств производится на ту же самую карту, с которой был произведён платёж.</p>
            </section>
        </div>
    );
};

export default PaymentPage;
