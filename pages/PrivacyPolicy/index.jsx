import Layout from '../../components/layout';
import styles from '../../styles/PrivacyPolicy.module.css';

export default function PrivacyPolicy() {

    return (
        <Layout title={'サイトポリシー'}>
            <div className={styles.container}>

                <div className={styles.secssion}>
                    <div className={styles.title}><u>サイトポリシー</u></div>
                    <div className={styles.text}>TalkUp(https://talkup.me/）における免責事項は、下記の通りです。</div>
                </div>

                <div className={styles.secssion}>
                    <div className={styles.title}><u>▼広告の配信について</u></div>
                    <div className={styles.text}>当サイトはGoogle及びGoogleのパートナー（第三者配信事業者）の提供する広告を設置しております。</div>
                    <div className={styles.text}>その広告配信にはCookieを使用し、当サイトやその他のサイトへの過去のアクセス情報に基づいて広告を配信します。</div>
                    <div className={styles.text}>Google が広告 Cookie を使用することにより、当サイトや他のサイトにアクセスした際の情報に基づいて、Google やそのパートナーが適切な広告を表示しています。</div>
                    <div className={styles.text}>お客様はGoogleアカウントの広告設定ページ（https://adssettings.google.com/u/0/authenticated）で、パーソナライズ広告を無効にできます。</div>
                    <div className={styles.text}>また aboutads.info のページにアクセスして頂き、パーソナライズ広告掲載に使用される第三者配信事業者のCookieを無効にできます。</div>
                    <div className={styles.text}>その他、Googleの広告におけるCookieの取り扱い詳細については、Googleのポリシーと規約ページ（https://policies.google.com/technologies/ads）をご覧ください。</div>
                </div>

                <div className={styles.secssion}>
                    <div className={styles.title}><u>▼当サイトで掲載している画像の著作権や肖像権等について</u></div>
                    <div className={styles.text}>当サイトで掲載している文章や画像などについて、無断転載を禁止します。</div>
                    <div className={styles.text}>当サイトで掲載している画像の著作権や肖像権等は、各権利所有者に帰属します。万が一問題がある場合は、お問い合わせよりご連絡いただけますよう宜しくお願い致します。</div>
                </div>

                <div className={styles.secssion}>
                    <div className={styles.title}><u>▼損害等の責任について</u></div>
                    <div className={styles.text}>当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますので、ご了承ください。</div>
                    <div className={styles.text}>また当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任も負いません。</div>
                    <div className={styles.text}>当サイトの保守、火災、停電、その他の自然災害、ウィルスや第三者の妨害等行為による不可抗力によって、当サイトによるサービスが停止したことに起因して利用者に生じた損害についても、何ら責任を負うものではありません。</div>
                    <div className={styles.text}>当サイトを利用する場合は、自己責任で行う必要があります。</div>
                </div>

                <div className={styles.secssion}>
                    <div className={styles.title}><u>▼転載について</u></div>
                    <div className={styles.text}>当サイトはリンクフリーです。リンクを貼る際の許可は必要ありません。引用についても、出典元のURLを貼っていただければ問題ありません。</div>
                    <div className={styles.text}>ただし、インラインフレームの使用や画像の直リンクはご遠慮ください。</div>
                </div>

                <div className={styles.secssion}>
                    <div className={styles.title}><u>▼コメントについて</u></div>
                    <div className={styles.text}>次の各号に掲げる内容を含むコメントは、当サイト管理人の裁量によって承認せず、削除する事があります。</div>
                    <div className={styles.text}>	•	特定の自然人または法人を誹謗し、中傷するもの</div>
                    <div className={styles.text}>	•	極度にわいせつな内容を含むもの</div>
                    <div className={styles.text}>	•	禁制品の取引に関するものや、他者を害する行為の依頼など、法律によって禁止されている物品、行為の依頼や斡旋などに関するもの</div>
                    <div className={styles.text}>	•	その他、公序良俗に反し、または管理人によって承認すべきでないと認められるもの</div>
                </div>

            </div>
        </Layout>
    );
}














