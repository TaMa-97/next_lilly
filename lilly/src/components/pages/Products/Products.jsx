import styles from './Products.module.scss'

const Products = () => {
  return (
    <section className={styles.myProjects}>
      <div className="container">
        <div className={styles.myProjects__head}>
          <h2 className={styles.myProjects__title}>Projects &#128011;</h2>
          <p className={styles.myProjects__lead}>個人的につくったもの</p>
        </div>
        <ul className={styles.myProjects__list}>
          <li className={styles.myProjects__item}>
            <a href="/" className={styles.myProjects__link}>
              <p className={styles.myProjects__linkTitle}>Lilly</p>
              <div className={styles.myProjects__linkInner}>
                <ul className={styles.myProjects__linkList}>
                  <li className={styles.myProjects__linkItem}>Next.js</li>
                  <li className={styles.myProjects__linkItem}>TypeScript</li>
                </ul>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Products
